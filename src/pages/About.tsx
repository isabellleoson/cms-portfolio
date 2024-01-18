import { HeadFC, PageProps, graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


interface AboutProps {
  title: string;
  slug: string;
  metaDescription: string;
  description: {
    raw: string;
  };
}

interface QueryResult {
  contentfulResumePages: AboutProps;
}

const About: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const about = data.contentfulResumePages;

  return (
    <>
      <Layout>
        <div className="p-6">
          <h1 className="mb-4 text-center font-bold">{about.title}</h1>
          <span>
            {documentToReactComponents(JSON.parse(about.description.raw))}
          </span>
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulResumePages(slug: { eq: "about" }) {
      description {
        raw
      }
      title
      metaDescription
      slug
    }
  }
`;

export default About;

export const Head: HeadFC<QueryResult> = ({ data }) => {
  const title = data.contentfulResumePages.title;
  const description = data.contentfulResumePages.metaDescription;

  return (
    <>
      <html lang="en" />
      <meta name="description" content={description}></meta>
      <title>{title}</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};
