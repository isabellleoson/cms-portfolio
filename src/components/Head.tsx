import React from "react";

interface HeadProps {
  titel: string;
  metaDescription: string;
}

// component to handle dynamic head data
const Head: React.FC<HeadProps> = ({ titel, metaDescription }) => {
  return (
    <>
      <html lang="en" />
      {metaDescription && <meta name="description" content={metaDescription} />}
      <title>{titel}</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};

export default Head;
