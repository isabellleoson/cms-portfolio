import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import PortfolioPage from "../components/PortfolioPage";
import Navbar from "../components/NavbarPortfolioProjects";
import { getImage } from "gatsby-plugin-image";

interface GatsbyImageSource {
  srcSet: string;
  type: string;
  sizes: string;
}

interface GatsbyImageData {
  images: {
    sources: GatsbyImageSource[];
    fallback: {
      src: String;
      srcSet: String;
      sizes: String;
    };
  };
  layout: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface images {
  gatsbyImageData: GatsbyImageData;
}

interface PortfolioNode {
  id: string;
  slug: string;
  category: string;
  categoryFrameworks: string;
  underrubrik: string;
  beskrivning: {
    raw: string;
  };
  titel: string;
  bild: {
    gatsbyImageData: images;
  };
}

interface PortfolioQuery {
  allContentfulPortfolio: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const Portfolio: React.FC<PageProps<PortfolioQuery>> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "All",
    categoryFrameworks: "All",
  });
  const allPosts = props.data.allContentfulPortfolio.edges;

  const imageData = props.data.allContentfulPortfolio;
  const image = getImage(imageData);

  const categories = [
    "Alla projekt",
    ...new Set(allPosts.map((post) => post.node.category)),
    ...new Set(allPosts.map((post) => post.node.categoryFrameworks)),
  ];

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategory = event.target.value;
    const selectedcategoryFrameworks = event.target.value;

    setSelectedCategory({
      category: selectedCategory,
      categoryFrameworks: selectedcategoryFrameworks,
    });
  };

  const filteredPosts = () => {
    if (
      selectedCategory.category === "All" ||
      selectedCategory.categoryFrameworks === "All"
    ) {
      return allPosts;
    } else {
      return allPosts.filter(
        (post) =>
          post.node.category === selectedCategory.category ||
          post.node.categoryFrameworks === selectedCategory.categoryFrameworks,
      );
    }
  };

  console.log("selectedCategory:", selectedCategory);
  console.log("filteredPosts:", filteredPosts());

  return (
    <Layout>
      <Navbar />

      <main className="">
        <div className="flex justify-end">
          <label htmlFor="categories">
            <select
              id="categories"
              className="p-2 m-2 rounded-lg shadow-md"
              onChange={(e) => handleCategoryChange(e)}
            >
              {categories.map((category, index) => (
                <option key={`${index}`} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-2">
          {filteredPosts().map(({ node }, index) => (
            <>
              <div key={index}>
                <PortfolioPage
                  key={node.slug}
                  slug={node.slug}
                  title={node.titel}
                  underrubrik={node.underrubrik}
                  imageData={node.bild && node.bild}
                  description={
                    ""
                      ? documentToReactComponents(
                          JSON.parse(node.beskrivning.raw),
                        )
                      : null
                  }
                />
              </div>
            </>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query FilterQuery {
    allContentfulPortfolio {
      edges {
        node {
          slug
          id
          category
          categoryFrameworks
          underrubrik
          beskrivning {
            raw
          }
          titel
          bild {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default Portfolio;

export const Head: HeadFC<PortfolioNode> = ({ data }) => {
  const title = data.titel;

  return (
    <>
      <html lang="en" />
      <meta
        name="description"
        content="Explore my frontend portfolio showcasing cutting-edge projects. Elevate user experiences with innovative designs and seamless functionality. Dive into a world of creativity. Click to view now."
      ></meta>
      <title>{title}</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};
