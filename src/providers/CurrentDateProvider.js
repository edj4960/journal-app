import React, { useState } from 'react';

const CurrentDateContext = React.createContext({});

function CurrentDateProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentDateContext.Provider>
  );
}

export { CurrentDateContext, CurrentDateProvider };
