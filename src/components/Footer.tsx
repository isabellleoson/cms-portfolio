import React from "react";

const Footer = () => {
  return (
    <div className="h-44 flex justify-end items-end mb-0 relative">
      <span className="bg-[#791717] h-4/5 m-4 text-center text-white w-52 p-4 rounded-t-full absolute"></span>
      <span className="mb-8 mr-10 p-4 w-2/5 h-16 rounded-l-full bg-[#FCFF72] flex items-center absolute">
        <p>Copyright: Isabell Leoson 2024</p>
      </span>
    </div>
  );
};

export default Footer;

const bgColor = {
  backgroundColor: {
    red: "#791717",
    pink: "#FFD0F5",
    yellow: "#FCFF72",
  },
};
