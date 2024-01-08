// import { PageProps, graphql } from "gatsby";
// import * as React from "react";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { Link } from "gatsby";
// import Layout from "../components/Layout";

// interface BlogProps {
//   titel: string;
//   slug: string;
//   underrubrik: string;
//   category: string;
//   textfield: {
//     textfield: string;
//   };

//   bild: {
//     url: string;
//   };
//   galleri: {
//     url: string | null;
//   };
// }

// interface QueryResult {
//   allContentfulPortfolio: {
//     nodes: BlogProps[];
//   };
// }

// const FilterPage: React.FC<PageProps<QueryResult>> = ({ data }) => {
//   return (
//     <Layout pageTitle="">
//       {data.allContentfulPortfolio.nodes.map((blog) => (
//         <div>
//           <h1>
//             <Link to={blog.slug}>{blog.titel}</Link>
//           </h1>
//           <div>
//             <h3>{blog.underrubrik}</h3>
//             <p>
//               {documentToReactComponents(JSON.parse(blog.textfield.textfield))}
//             </p>
//             <img src={blog.bild.url} alt="bild" width="400" />
//           </div>
//         </div>
//       ))}
//     </Layout>
//   );
// };
// export const pageQuery = graphql`
//   query FilterQuery {
//     allContentfulPortfolio(category: { category: { eq: $category } }) {
//       nodes {
//         slug
//         category
//         underrubrik
//         textfield {
//           textfield
//         }
//         beskrivning {
//           raw
//         }
//         titel
//         bild {
//           file {
//             url
//           }
//         }
//       }
//     }
//   }
// `;
// export default FilterPage;
