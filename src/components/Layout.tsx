import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";
import NavbarMobile from "./NavbarMobile";
// import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [screenSize, setScreenSize] = React.useState<string>("");

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 770) {
        setScreenSize("mobile");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className="pb-2 bg-rose-300 drop-shadow-md">
        {/* <Navbar /> */}
        {/* <NavbarPages /> */}
        {screenSize === "mobile" && <NavbarMobile />}
        {screenSize === "desktop" && <Navigation />}
        {/* {screenSize === "desktop" && <NavbarPages />} */}
      </header>

      {children}
      <footer className="bg-rose-200 bg-opacity-95">
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
