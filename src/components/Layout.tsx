import * as React from "react";
import { useStaticQuery, graphql, HeadFC } from "gatsby";
import Navigation from "./navigation";
import Footer from "./Footer";
import NavbarMobile from "./NavbarMobile";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [screenSize, setScreenSize] = React.useState<string>("");

  // function to handle screen size, to be able to show different navbars depending on size. window.addEventListener listens to the screens size
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
      <header className="drop-shadow-md">
        {screenSize === "mobile" && <NavbarMobile />}
        {screenSize === "desktop" && <Navigation />}
      </header>
      <main className="bg-[#f9f2f6] min-h-screen">{children}</main>
      <footer className="bg-rose-200 bg-opacity-95">
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
