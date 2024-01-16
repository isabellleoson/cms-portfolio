import * as React from "react";
import { useStaticQuery, graphql, HeadFC } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";
import NavbarMobile from "./NavbarMobile";
// import { Helmet } from "react-helmet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <head>
        <html lang="en" />
        <meta name="description" content="Portfolio page"></meta>
        <title>Portfolio</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </head>
      <header className="pb-2 bg-rose-300 drop-shadow-md">
        {screenSize === "mobile" && <NavbarMobile />}
        {screenSize === "desktop" && <Navigation />}
      </header>
      {children}
      <footer className="bg-rose-300 bg-opacity-95">
        <Footer />
      </footer>
    </>
  );
};
export default Layout;

export const Head: HeadFC = () => (
  <head>
    <meta charSet="utf-8"></meta>
    <title>Portfolio</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </head>
);
