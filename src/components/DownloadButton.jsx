import { useState } from "react";
const DownloadButton = ({ targetRef }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!targetRef.current || !targetRef.current.getInvoiceData) return;

    const invoiceData = targetRef.current.getInvoiceData();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice_${Date.now()}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-black rounded-md">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="btn flex items-center gap-2 rounded-md p-2"
      >
        {/* Conditionally render the icon: show spinner when loading */}
        {loading ? (
          <span className="loading loading-spinner w-5 h-5 bg-white"></span> // Spinner icon when loading
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75v6.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-6.75M12 3v13.5m0 0l-4.5-4.5m4.5 4.5l4.5-4.5"
            />
          </svg> // Default icon
        )}

        {/* Conditionally render the text: show "Generating..." when loading */}
        <span className="text-white">
          {loading ? "Generating..." : "Download"}
        </span>
      </button>
    </div>
  );
};

export default DownloadButton;
