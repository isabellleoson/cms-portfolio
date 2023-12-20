import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";

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
      <header className="">
        <Navigation />
      </header>
      <main className="flex flex-col justify-center items-center">
        <h1 className="">{pageTitle}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
