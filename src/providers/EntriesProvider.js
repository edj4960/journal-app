import React, { useEffect, useState } from 'react';
import EntriesDAO from '../dao/EntriesDAO';

const EntriesContext = React.createContext({});

function EntriesProvider({ children }) {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        const entriesDao = new EntriesDAO();
        const allEntries = await entriesDao.getAllEntries();
        setEntries(allEntries);
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{ entries, fetchEntries }}>
            {children}
        </EntriesContext.Provider>
    );
}

export { EntriesContext, EntriesProvider };
