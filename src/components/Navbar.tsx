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
    <div className="bg-yellow-200 p-7 mb-2">
      <header className="">
        {/* <h2>Titel: {data.site.siteMetadata.title}</h2> */}
        {/* <h1 className="text-3xl">{pageTitle}</h1> */}
        {children}
      </header>

      <div className="flex justify-center">
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
              <Link to="/SinglePage" className="">
                En sida
              </Link>
            </li>
            <li className="">
              <Link to="/About" className="">
                Om
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
