import React, { useState } from "react";

const LogoUpload = ({ onLogoUpload }) => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   setLogo(URL.createObjectURL(file)); // for preview
    //   onLogoUpload(URL.createObjectURL(file));
    // }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Logo = reader.result; // This is the base64-encoded image
        setLogo(base64Logo); // Store the base64 logo
        onLogoUpload(base64Logo); // Send the base64 logo to the parent
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  return (
    <div className="mb-6">
      {!logo ? (
        <label className="cursor-pointer border border-dashed border-gray-400 w-48 h-48 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md">
          + Add Your Logo
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative w-48 h-48">
          <img
            src={logo}
            alt="Logo Preview"
            className="object-contain w-full h-full border rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default LogoUpload;
