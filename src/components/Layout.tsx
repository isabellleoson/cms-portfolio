import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";
import NavbarPages from "./NavbarPages";
// import Navbar from "./Navbar";

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
    <>
      <header className="pb-2 bg-rose-200 drop-shadow-md">
        {/* <Navbar /> */}
        {/* <NavbarPages /> */}
        <Navigation />
      </header>
      <h1 className="">{pageTitle}</h1>
      {children}
      <footer className="bg-rose-200 bg-opacity-95">
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
