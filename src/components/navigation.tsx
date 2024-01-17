import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Search from "./Search";

const Navigation = () => {
  return (
    <div className="flex items-center ">
      <nav className={`flex-1`}>
        <ul className="flex pl-14 space-x-10">
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
      </nav>

      <div className="mr-2 mt-2 flex justify-end">
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
              <Search searchIndex={data.siteSearchIndex.index} />
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default Navigation;
