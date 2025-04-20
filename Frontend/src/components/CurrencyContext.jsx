import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selected, setSelected] = useState("USD");

  const currencyOptions = [
    { value: "USD", symbol: "$", label: "USD ($)" },
    { value: "EUR", symbol: "€", label: "EUR (€)" },
    { value: "GBP", symbol: "£", label: "GBP (£)" },
    { value: "INR", symbol: "₹", label: "INR (₹)" },
    { value: "JPY", symbol: "¥", label: "JPY (¥)" },
    { value: "CNY", symbol: "¥", label: "CNY (¥)" },
    { value: "CAD", symbol: "$", label: "CAD ($)" },
    { value: "AUD", symbol: "$", label: "AUD ($)" },
    { value: "CHF", symbol: "CHF", label: "CHF (CHF)" },
    { value: "SGD", symbol: "$", label: "SGD ($)" },
    { value: "ZAR", symbol: "R", label: "ZAR (R)" },
    { value: "BRL", symbol: "R$", label: "BRL (R$)" },
    { value: "RUB", symbol: "₽", label: "RUB (₽)" },
    { value: "KRW", symbol: "₩", label: "KRW (₩)" },
    { value: "MXN", symbol: "$", label: "MXN ($)" },
    { value: "HKD", symbol: "$", label: "HKD ($)" },
    { value: "SEK", symbol: "kr", label: "SEK (kr)" },
    { value: "NOK", symbol: "kr", label: "NOK (kr)" },
    { value: "NZD", symbol: "$", label: "NZD ($)" },
  ];

  const selectedOption = currencyOptions.find(
    (option) => option.value === selected
  );

  const currencySymbol = selectedOption?.symbol || "$";

  return (
    <CurrencyContext.Provider value={{ selected, setSelected, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
