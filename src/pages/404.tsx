import * as React from "react";
import {
  Link,
  HeadFC,
  PageProps,
  StaticQuery,
  graphql,
} from "gatsby";
import Search from "../components/Search";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}></h1>
      <p style={paragraphStyles}>
        Sorry 😔, we couldn’t find what you were looking for...
        {process.env.NODE_ENV === "development" ? (
          <>
            <StaticQuery
              query={graphql`
                query SearchIndexQuery {
                  siteSearchIndex {
                    index
                  }
                }
              `}
              render={(data) => (
                <div className="flex p-4 items-center">
                  <p className="mr-2">Search Projects: </p>

                  <Search searchIndex={data.siteSearchIndex.index} />
                </div>
              )}
            />
          </>
        ) : null}
        <Link to="/">Go home</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => {
  return (
    <>
      <html lang="en" />
      <meta name="description" content="you took a wrong turn, sorry!"></meta>
      <title>404</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};
