import React from "react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface BlogProps {
  titel: string;
  slug: string;
  text: {
    text: string;
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
      <Layout pageTitle="">
        <main
          style={{
            backgroundImage: `url(${portfolio.image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
          className="flex justify-end"
        >
          <div className="p-2 text-end items-end flex flex-col">
            {/* <h1 className="m-2">{portfolio.titel}</h1> */}
            <p className="w-1/2">{portfolio.text.text}</p>
            <div className="space-x-5 mt-5">
              <Link to="/Portfolio" className="">
                Portfolio
              </Link>
              <Link to="/About" className="">
                About Isabell
              </Link>
            </div>

            {/* <p className="w-4/12">
              {documentToReactComponents(JSON.parse(portfolio.text.text))}
            </p> */}
          </div>
        </main>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "/" }) {
      titel
      slug
      text {
        text
      }
      image {
        url
      }
    }
  }
`;

export default Index;

export const Head: HeadFC = () => <title>Hem</title>;
