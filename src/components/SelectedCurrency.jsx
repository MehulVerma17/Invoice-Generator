import { useCurrency } from "./CurrencyContext";

const SelectedCurrency = () => {
  const { selected, setSelected } = useCurrency();

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
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-500">Currency</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-1 rounded bg-white text-black w-30"
      >
        {currencyOptions.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectedCurrency;
