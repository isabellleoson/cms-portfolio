import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Search from "./Search";

const Navigation = () => (
  <>
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
            <p className="mr-2">Sök: </p>

            <Search searchIndex={data.siteSearchIndex.index} />
          </div>
        )}
      />
    </div>
    <nav className="">
      <ul className="flex space-x-10 justify-center">
        <li className="">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Portfolio" className="">
            Portfolio
          </Link>
        </li>
        <li className="">
          <Link to="/About" className="">
            About
          </Link>
        </li>
      </ul>
    </nav>
  </>
);
export default Navigation;
