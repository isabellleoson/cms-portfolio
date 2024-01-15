import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";

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

interface PortfolioPageProps {
  title?: string;
  description?: React.ReactNode;
  imageData?: {
    gatsbyImageData: images;
  };
  imageRaw?: string | null;
  slug?: string;
  underrubrik?: string;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  title,
  description,
  imageData,
  underrubrik,
  slug,
}) => {
  const image = imageData ? getImage(imageData) : null;
  return (
    <a href={`/${slug}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-2">
        {image && (
          <GatsbyImage alt="front image for portfolio project" image={image} />
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <h6>{underrubrik}</h6>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default PortfolioPage;
