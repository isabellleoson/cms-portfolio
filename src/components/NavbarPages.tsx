import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

interface Node {
  slug: string;
  titel: string;
}

const NavbarPages = () => (
  <>
    <nav className="">
      <ul className="flex space-x-10 justify-center">
        <StaticQuery
          query={graphql`
            query MyQuery {
              allContentfulPages {
                nodes {
                  slug
                  titel
                }
              }
            }
          `}
          render={(data: { allContentfulPages: { nodes: Node[] } }) =>
            data.allContentfulPages.nodes.map((node) => (
              <li key={node.slug} className="">
                <Link to={`/${node.slug}`} className="">
                  <p>{node.titel}</p>
                </Link>
              </li>
            ))
          }
        />
      </ul>
    </nav>
  </>
);

export default NavbarPages;
