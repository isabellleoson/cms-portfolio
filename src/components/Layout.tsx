import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import NavbarPages from "./NavbarPages";

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
        <Navbar />
        
        {/* <NavbarPages /> */}
        <Navigation />
      </header>
      <main className="flex flex-col bg-blue-500">
        <h1 className="">{pageTitle}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
