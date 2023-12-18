import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Navbar from "../components/Navbar";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="">
    
      <h1 className="text-lg">Välkommen till mitt portfolio</h1>
      <Navbar pageTitle="Hem">
        <p></p>
      </Navbar>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
