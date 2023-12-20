import React from "react";
import { Link } from "gatsby";

const Navigation = () => (
  <nav className="flex justify-end">
    <ul className=" text-end justify-end">
      <li className="">
        <Link to="/" className="">
          Hem
        </Link>
      </li>
      <li className="">
        <Link to="/Portfolio" className="">
          Portfolio
        </Link>
      </li>
      <li className="">
        <Link to="/SinglePage" className="">
          En sida
        </Link>
      </li>
      <li className="">
        <Link to="/About" className="">
          Om
        </Link>
      </li>
      <li className="">
        <Link to="/$slug" className="">
          Om
        </Link>
      </li>

    </ul>
  </nav>
);
export default Navigation;