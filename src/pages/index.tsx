import React from "react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface BlogProps {
  titel: string;
  slug: string;
  richText: {
    raw: string;
  };
  image: {
    url: string | null;
  };
}

interface QueryResult {
  contentfulPages: BlogProps;
}

const Index: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPages;

  return (
    <>
      {/* <Layout pageTitle=""> */}
      <main
        // style={{
        //   backgroundImage: `url(${portfolio.image.url})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   minHeight: "500px",
        // }}
        className="flex justify-end p-6"
      >
        <div className="p-2 text-end items-end flex flex-col">
          {/* <h1 className="m-2">{portfolio.titel}</h1> */}

          {portfolio.richText && (
            <div className="text-5xl tracking-wider">
              {documentToReactComponents(JSON.parse(portfolio.richText.raw))}
            </div>
          )}

          <div className="space-x-5 mt-5 text-4xl">
            <Link to="/Category" className="">
              Portfolio
            </Link>
            <Link to="/Resume" className="">
              Resumé
            </Link>
          </div>

          {/* <p className="w-4/12">
              {documentToReactComponents(JSON.parse(portfolio.text.text))}
            </p> */}
        </div>
      </main>
      {/* </Layout> */}
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "/" }) {
      titel
      slug
      richText {
        raw
      }
      image {
        url
      }
    }
  }
`;

export default Index;

export const Head: HeadFC = () => <title>Hem</title>;
