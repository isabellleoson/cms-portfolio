import { Link } from "gatsby";
import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-end items-end p-6 text-stone-900 bg-rose-300">
      <Link
        className="flex-1 text-base font-semibold hover:text-stone-600 text-stone-900"
        to="/Contact"
      >
        Contact me
      </Link>
      <p className="text-sm">Copyright: Isabell Leoson 2024</p>
    </div>
  );
};

export default Footer;
