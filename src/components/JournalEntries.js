import React, { useState, useEffect, useContext } from 'react';
import EntriesDAO from '../dao/EntriesDAO';
import { CurrentDateContext } from '../providers/CurrentDateProvider';
import { EntriesContext } from '../providers/EntriesProvider';
import { datesEqual, formatDate } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function JournalEntries() {
  const [loaded, setLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
  const { entries, fetchEntries } = useContext(EntriesContext);

  useEffect(() => {
    if (entries == []) {
      setLoaded(false);
    } else {
      setLoaded(true);
    }
  }, [entries]);

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const remainingScroll = scrollHeight - scrollTop - clientHeight;

    if (remainingScroll < 50) {
      setShowMore(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const deleteEntry = async (entry) => {
    const entriesDao = new EntriesDAO();
    await entriesDao.deleteEntry(formatDate(entry.date));
    setCurrentDate(new Date());
    fetchEntries();
    setShowConfirmDelete(false);
  }

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='entries-container'>
      {entries.map(entry => (
        <div
          key={entry.date.toString()}
          onClick={() => setCurrentDate(entry.date)}
          className={`entry ${datesEqual(entry.date, currentDate) ? 'selected-date' : ''}`}
        >
          <span>
            {formatDate(entry.date)}
          </span>
          {
            !showConfirmDelete ?
              <FontAwesomeIcon
                className='delete-icon'
                icon={faTrashCan}
                onClick={() => setShowConfirmDelete(true)}
              />
              :
              <span className='confirm-delete'>
                <FontAwesomeIcon
                  icon={faCheck}
                  className='confirm-delete-icon'
                  onClick={() => deleteEntry(entry)}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className='cancel-delete-icon'
                  onClick={() => setShowConfirmDelete(false)}
                />
              </span>
          }
        </div>
      ))}
      {showMore && <div>Loading more entries...</div>}
    </div>
  );
}

export default JournalEntries;
