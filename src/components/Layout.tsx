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
    <>
      <header className="pb-2 bg-stone-100">
        <Navbar />

        {/* <NavbarPages /> */}
        <Navigation />
      </header>
      <main className="">
        <h1 className="">{pageTitle}</h1>
        {children}
      </main>
      <footer className="bg-stone-100">
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
