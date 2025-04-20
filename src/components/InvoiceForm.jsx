// src/components/InvoiceForm.jsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import LogoUpload from "./LogoUpload";
import { useCurrency } from "./CurrencyContext";

const InvoiceForm = forwardRef((props, ref) => {
  const { currencySymbol } = useCurrency(); // Access the selected currency from context
  const [invoiceData, setInvoiceData] = useState({
    logo: "",
    from: "",
    to: "",
    ship_to: "",
    number: "",
    currency: "$",
    date: "",
    due_date: "",
    items: [],
    discounts: 0,
    tax: 0,
    shipping: 0,
    amount_paid: 0,
    notes: "",
    terms: "",
  });

  // This function will be passed down to LogoUpload to update the logo
  const handleLogoUpload = (logoUrl) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      logo: logoUrl,
    }));
  };
  // Expose invoiceData to parent via ref
  useImperativeHandle(ref, () => ({
    getInvoiceData: () => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const formatCurrency = (amount) =>
        `${currencySymbol}${formatter.format(amount)}`;

      const itemsWithAmount = items.map((item) => ({
        ...item,
        individualAmount: formatCurrency(item.quantity * item.price),
        price: formatCurrency(item.price),
      }));

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      const total =
        subtotal -
        invoiceMeta.discount +
        invoiceMeta.tax +
        invoiceMeta.shipping;
      const balanceDue = total - invoiceMeta.paid;

      return {
        logo: invoiceData.logo,
        from: client.from,
        to: client.to,
        ship_to: client.shipTo,
        number: `# ${invoiceMeta.number}`,
        currency: currencySymbol,
        date: invoiceMeta.date || new Date().toISOString().split("T")[0], //invoiceMeta.date,
        due_date: invoiceMeta.due,
        items: itemsWithAmount,
        discounts: formatter.format(invoiceMeta.discount),
        tax: formatter.format(invoiceMeta.tax),
        shipping: formatter.format(invoiceMeta.shipping),
        amount_paid: formatter.format(invoiceMeta.paid),
        notes: client.notes,
        terms: client.terms,
        subtotal: formatter.format(subtotal),
        total: formatter.format(total),
        balance_due: formatter.format(balanceDue),
      };
    },
  }));

  const [client, setClient] = useState({
    from: "",
    to: "",
    shipTo: "",
    notes: "",
    terms: "",
  });

  const [invoiceMeta, setInvoiceMeta] = useState({
    number: "",
    date: "",
    due: "",
    discount: 0,
    tax: 0,
    shipping: 0,
    paid: 0,
  });

  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total =
    subtotal - invoiceMeta.discount + invoiceMeta.tax + invoiceMeta.shipping;
  const balanceDue = total - invoiceMeta.paid;

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "description" ? value : Number(value);
    setItems(updated);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
    <div
      ref={ref}
      className="max-w-5xl mx-auto mt-6 p-6 bg-white shadow text-black"
    >
      <h1 className="text-3xl font-bold text-right">INVOICE</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <LogoUpload onLogoUpload={handleLogoUpload} />
        <div className="grid grid-rows-3 mt-2">
          <div className="text-right">
            <label className="input bg-white input-neutral placeholder:text-sm w-40 h-10">
              <span className="h-[1em] opacity-50 text-gray-500">#</span>{" "}
              {/* Replaced SVG with # symbol */}
              <input
                value={invoiceMeta.number}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    number: e.target.value,
                  })
                }
                type="text"
                className="grow"
                placeholder="invoice number"
              />
            </label>
          </div>
          <div className="flex justify-end items-center gap-2 ">
            <label className="text-sm text-gray-500 px-3">Date</label>
            <input
              value={invoiceMeta.date}
              onChange={(e) =>
                setInvoiceMeta({ ...invoiceMeta, date: e.target.value })
              }
              type="date"
              className="input input-neutral bg-white text-black w-40 h-10"
              style={{ colorScheme: "light" }}
            />
          </div>
          <div className="flex justify-end items-center gap-2 ">
            <label className="text-sm text-gray-500 px-3">Due Date</label>
            <input
              value={invoiceMeta.due}
              onChange={(e) =>
                setInvoiceMeta({ ...invoiceMeta, due: e.target.value })
              }
              type="date"
              className="input input-neutral bg-white text-black w-40 h-10"
              style={{ colorScheme: "light" }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <input
          value={client.from}
          onChange={(e) => setClient({ ...client, from: e.target.value })}
          className="input input-xl bg-white input-neutral placeholder:text-sm"
          placeholder="Who is this from?"
        />
        <br></br>
        <div className="flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Bill To</span>
            </label>
            <input
              value={client.to}
              onChange={(e) => setClient({ ...client, to: e.target.value })}
              className="input input-xl bg-white input-neutral placeholder:text-sm"
              placeholder="Who is this to?"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ship To</span>
            </label>
            <input
              value={client.shipTo}
              onChange={(e) => setClient({ ...client, shipTo: e.target.value })}
              className="input input-xl bg-white input-neutral placeholder:text-sm"
              placeholder="(optional)"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-2">Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="w-4/6 px-1 py-1">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(idx, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="Description of item/service"
                  />
                </td>
                <td className="w-1/9 px-1 py-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </td>
                <td className="w-1/8 px-1 py-1">
                  <div className="flex items-center bg-gray-100 border rounded-md">
                    <span className="px-2 text-gray-600 text-sm">{`${currencySymbol}`}</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(idx, "price", e.target.value)
                      }
                      className="w-full p-2 bg-white focus:outline-none rounded-r-md"
                    />
                  </div>
                </td>
                <td className="text-center pr-2 p-2">
                  {`${currencySymbol}${item.quantity * item.price}`}
                </td>
                <td>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addItem}
          className="mt-2 px-4 py-1 border rounded-md text-green-600 border-green-600 hover:bg-green-50"
        >
          + Line Item
        </button>
      </div>

      <div className="mt-6 flex gap-26 items-start">
        {/* Notes and Terms */}
        <div className="flex-1 grid grid-rows-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 block">Notes</label>
            <textarea
              value={client.notes}
              onChange={(e) => setClient({ ...client, notes: e.target.value })}
              className="border p-2 h-20 w-full"
              placeholder="Notes - any relevant information"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block">Terms</label>
            <textarea
              value={client.terms}
              onChange={(e) => setClient({ ...client, terms: e.target.value })}
              className="border p-2 h-20 w-full"
              placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
            />
          </div>
        </div>

        {/* Totals & Summary */}
        <div className="w-72 space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>Subtotal:</p>
            <p className="text-black font-medium">{`${currencySymbol}${subtotal.toFixed(
              2
            )}`}</p>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500">Discount:</p>
            <div className="flex items-center gap-1">
              <span>{`${currencySymbol}`}</span>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={invoiceMeta.discount}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    discount: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500">Tax:</p>
            <div className="flex items-center gap-1">
              <span>{`${currencySymbol}`}</span>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={invoiceMeta.tax}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    tax: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500">Shipping:</p>
            <div className="flex items-center gap-1">
              <span>{`${currencySymbol}`}</span>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={invoiceMeta.shipping}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    shipping: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between items-center font-bold text-lg">
            <p className="text-gray-700">Total:</p>
            <p>{`${currencySymbol}${total.toFixed(2)}`}</p>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500">Amount Paid:</p>
            <div className="flex items-center gap-1">
              <span>{`${currencySymbol}`}</span>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={invoiceMeta.paid}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    paid: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between items-center font-semibold">
            <p className="text-gray-700">Balance Due:</p>
            <p>{`${currencySymbol}${balanceDue.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InvoiceForm;
