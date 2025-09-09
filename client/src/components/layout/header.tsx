// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center bg-green-600 text-white px-6 py-3 shadow-md">
      {/* لوگو */}
      <img
        src="/logo.png" // مسیر لوگو را به public اضافه کن
        alt="Logo"
        className="h-10 w-10 mr-3"
      />

      {/* عنوان سیستم */}
      <h1 className="text-xl font-bold tracking-wide">
        سیستم مدیریت گدام پوهنتون
      </h1>
    </header>
  );
};

export default Header;
