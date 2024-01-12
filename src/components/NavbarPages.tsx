import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

interface Node {
  slug: string;
  titel: string;
}

const NavbarPages = () => (
  <>
    <nav className="">
      <ul className="flex flex-wrap space-x-10 justify-center pb-2 pt-2">
        <StaticQuery
          query={graphql`
            query MyPagesQuery {
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

export default NavbarPages;
