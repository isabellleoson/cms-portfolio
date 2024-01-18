import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

interface Node {
  slug: string;
  titel: string;
}

const Ul = styled.ul`
  justify-content: center;

  @media (max-width: 500px) {
    justify-content: space-around;
    font-size: 14px;
  }
`;

const Navbar = () => (
  <>
    <nav className="">
      <Ul className="flex flex-wrap pb-2 pt-2 bg-pink-100">
        <StaticQuery
          query={graphql`
            query MyNavQuery {
              allContentfulPortfolio {
                nodes {
                  slug
                  titel
                }
              }
            }
          `}
          // maps through a content type to use slug to dynamiclly render portfolio projects to the project navbar
          render={(data: { allContentfulPortfolio: { nodes: Node[] } }) =>
            data.allContentfulPortfolio.nodes.map((node) => (
              <li
                key={node.slug}
                className="text-stone-900 p-2 hover:text-stone-700 font-semibold"
              >
                <Link
                  to={`/${node.slug}`}
                  className=""
                  activeStyle={{
                    textDecoration: "underline",
                  }}
                >
                  {node.titel}
                </Link>
              </li>
            ))
          }
        />
      </Ul>
    </nav>
  </>
);

export default Navbar;
