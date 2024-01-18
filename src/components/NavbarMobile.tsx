import React, { useEffect, useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Search from "./Search";
import styled from "styled-components";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Nav = styled.nav``;

const Container = styled.div`
  z-index: 100 !important;
`;
const Li = styled.li`
  &:hover {
    color: gray;
  }
`;

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //toggles hamburger menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container className="flex justify-end bg-rose-200">
      <div className="flex flex-col items-end">
        <button className="p-4" onClick={toggleMenu}>
          {!isOpen && <RiMenu3Fill className="text-2xl" />}
        </button>
      </div>

      {isOpen ? (
        <div className="flex flex-col items-end text-end">
          <button className="p-2" onClick={toggleMenu}>
            {isOpen && <IoMdClose className="text-2xl" />}
          </button>
          <Nav className="flex flex-col pl-6 pr-6 pb-6 ">
            <ul className="flex flex-1 flex-col pt-2 pb-2">
              <Li>
                <Link
                  to="/"
                  className=""
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Link>
              </Li>
              <Li>
                <Link
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                  to="/Portfolio"
                  className=""
                >
                  Portfolio
                </Link>
              </Li>
              <Li className="">
                <Link
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                  to="/Resume"
                  className=""
                >
                  Resumé
                </Link>
              </Li>
              <Li className="">
                <Link
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                  to="/Contact"
                  className=""
                >
                  Contact
                </Link>
              </Li>
            </ul>

            <div className="">
              <StaticQuery
                query={graphql`
                  query SearchIndexQuery {
                    siteSearchIndex {
                      index
                    }
                  }
                `}
                render={(data) => (
                  <div className="flex flex-wrap items-center pt-2">
                    <Search searchIndex={data.siteSearchIndex.index} />
                  </div>
                )}
              />
            </div>
          </Nav>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};
export default NavbarMobile;
