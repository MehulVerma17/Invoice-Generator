import React, { useRef } from "react";
import InvoiceForm from "./components/InvoiceForm";
import SelectedCurrency from "./components/SelectedCurrency";
import { CurrencyProvider } from "./components/CurrencyContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DownloadButton from "./components/DownloadButton";

function App() {
  const invoiceRef = useRef();
  return (
    <>
      <CurrencyProvider>
        <NavBar />
        <div className="bg-gray-100 min-h-[1100px] p-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Invoice Form */}
              <div className="w-full lg:max-w-4xl">
                <InvoiceForm ref={invoiceRef} />
              </div>

              {/* Currency Selector */}
              <div className="w-full lg:w-auto pt-8">
                <div className="mb-6">
                  <DownloadButton targetRef={invoiceRef} />
                </div>

                <div className="border-t border-b border-gray-300 py-4 px-6">
                  <SelectedCurrency />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </CurrencyProvider>
    </>
  );
}

export default App;
