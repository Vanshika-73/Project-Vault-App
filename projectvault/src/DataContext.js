import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [lastPage, setLastPage] = useState('');
  const [dropdownData, setDropDownData] = useState(null);
  const [footerFixed, setFooterFixed] = useState(false);

  const setFooterFixedFunction = (data) => {
    setFooterFixed(data);
  };

  const setLastVisitedPage = (page) => {
    setLastPage(page);
  };

  const setDropDownDataFunction = (data) => {
    setDropDownData(data);
  };

  return (
    <DataContext.Provider value={{ lastPage, setLastVisitedPage, dropdownData, setDropDownDataFunction, footerFixed, setFooterFixedFunction }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
