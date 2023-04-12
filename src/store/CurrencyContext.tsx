import React, { useState, FC, useContext } from 'react';
 


interface ICurrencyContext {
    currency: string;
    togglCurrency: (currency: string) => void;
  }
  
  const defaultState = {
    currency: 'USD',
  };
  
  const CurrencyContext = React.createContext<ICurrencyContext>(defaultState as ICurrencyContext);


interface ICurrencyContextProvider {
    children: React.ReactNode
}

export const CurrencyProvider: FC<ICurrencyContextProvider> = ({ children }) => {
  const [currency, seCurrency] = useState(defaultState.currency);

  const togglCurrency = (currency: string) => {
    seCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        togglCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () =>  useContext(CurrencyContext);