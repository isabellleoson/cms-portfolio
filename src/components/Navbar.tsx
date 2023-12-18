import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

interface LayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div className="">
      <header className=""><h2>Titel: {data.site.siteMetadata.title}</h2></header>
      <nav>
        <ul className="flex space-x-10">
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
            <Link to="/About" className="">
              Om
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className="text-3xl">{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
