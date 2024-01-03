import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

interface Node {
  slug: string;
  titel: string;
}

const Navbar = () => (
  <>
    <nav className="">
      <ul className="flex space-x-10 justify-center">
        <StaticQuery
          query={graphql`
            query MyQuery {
              allContentfulPortfolio {
                nodes {
                  slug
                  titel
                }
              }
            }
          `}
          render={(data: { allContentfulPortfolio: { nodes: Node[] } }) =>
            data.allContentfulPortfolio.nodes.map((node) => (
              <li key={node.slug} className="">
                <Link to={`/${node.slug}`} className="">
                  {node.titel}
                </Link>
              </li>
            ))
          }
        />
      </ul>
    </nav>
  </>
);

export default Navbar;
