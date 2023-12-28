  "use client"
  import React, { createContext, useState, useContext } from 'react';

  export const DataContext = createContext();
  const DataProvider = ({children}) => {

    const [showMenu, setShowMenu] = useState(true);
          
    return (
      <DataContext.Provider
    value={{
          showMenu,
          setShowMenu
      }}
    >
      {children}
    </DataContext.Provider>
    )
  }

  export default DataProvider