import React, { useState, useEffect, useContext, useCallback } from 'react';
import EntriesDAO from '../dao/EntriesDAO';
import { CurrentDateContext } from '../providers/CurrentDateProvider';
import { EntriesContext } from '../providers/EntriesProvider';
import { formatDate, stringToDate } from '../util';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function EntryForm() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [entryExists, setEntryExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
  const { fetchEntries } = useContext(EntriesContext);

  useEffect(() => {
    async function fetchEntry() {
      setLoading(true);

      const entriesDao = new EntriesDAO();
      const entry = await entriesDao.getEntryByDate(formatDate(currentDate));

      if (entry) {
        setValue(entry.value);
        setEntryExists(true);
      } else {
        setValue('');
        setEntryExists(false);
      }

      setLoading(false);
    }

    if (!currentDate) {
      setCurrentDate(new Date());
    } else {
      fetchEntry();
    }
  }, [currentDate]);

  async function onValueChange(event) {
    event.preventDefault();

    const newText = event.target.value;
    setValue(newText);
    debouncedSave(newText, entryExists, currentDate);
  }

  const debouncedSave = useCallback(
    debounce(async (new_value, entryExists, currentDate) => {
      const entriesDao = new EntriesDAO();

      if (new_value == '') {
        if (entryExists) {
          const success = await entriesDao.deleteEntry(formatDate(currentDate));
          setMessage(success ? 'Entry deleted' : 'Error deleting entry.');
          setEntryExists(false);
        }
        return;
      }

      if (entryExists) {
        const success = await entriesDao.updateEntry(formatDate(currentDate), new_value);
        setMessage(!success && 'Error updating entry.');
      } else {
        const date = await entriesDao.createEntry(formatDate(currentDate), new_value);
        setMessage(!date && 'Error saving entry.');
        setEntryExists(true);
        fetchEntries();
      }
    }, 500),
    []
  );

  return (
    <form>
      <div>
        <input
          type="date"
          value={formatDate(currentDate)}
          onChange={event => setCurrentDate(stringToDate(event.target.value))}
          required
        />
      </div>
      <textarea
        id="entry-value"
        value={value}
        onChange={event => onValueChange(event)}
        required
      />
      {message && <div>{message}</div>}
    </form>
  );
}

export default EntryForm;
