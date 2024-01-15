import React, { useEffect, useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Search from "./Search";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="text-end w-full">
        <button className=" p-4" onClick={toggleMenu}>
          {isOpen ? (
            <p className="bold">Close Menu</p>
          ) : (
            <p className="">Menu</p>
          )}
        </button>
      </div>

      {isOpen ? (
        <nav className="flex p-6">
          <ul className="flex flex-1 flex-col pt-2">
            <li className="">
              <Link
                to="/"
                className=""
                activeStyle={{
                  fontWeight: "bold",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                }}
                to="/Portfolio"
                className=""
              >
                Portfolio
              </Link>
            </li>
            <li className="">
              <Link
                activeStyle={{
                  fontWeight: "bold",
                }}
                to="/Resume"
                className=""
              >
                Resumé
              </Link>
            </li>
            <li className="">
              <Link
                activeStyle={{
                  fontWeight: "bold",
                }}
                to="/Contact"
                className=""
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="">
            <StaticQuery
              query={graphql`
                query SearchIndexQuery {
                  siteSearchIndex {
                    index
                  }
                }
              `}
              render={(data) => (
                <div className="flex flex-wrap items-center">
                  <p className="mr-2">Search Projects: </p>

                  <Search searchIndex={data.siteSearchIndex.index} />
                </div>
              )}
            />
          </div>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};
export default NavbarMobile;
