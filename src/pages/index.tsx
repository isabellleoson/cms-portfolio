import React from "react";
import { graphql, PageProps, HeadFC } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

// interface BlogProps {
//   titel: string;
//   slug: string;
//   beskrivning: {
//     raw: string;
//   };
//   bild: {
//     file: {
//       url: string | null;
//     };
//   };
// }

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
          className="flex"
        >
          <div className="p-2 text-end justify-end flex"></div>

          <div className="p-2 text-end items-end flex flex-col">
            <h1 className="m-2">{portfolio.titel}</h1>
            <p>{portfolio.text.text}</p>

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
