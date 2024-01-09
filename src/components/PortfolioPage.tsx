import * as React from "react";

interface PortfolioPageProps {
  title?: string;
  description?: React.ReactNode;
  imageUrl?: string | null;
  imageRaw?: string | null;
  slug?: string;
  underrubrik?: string;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  title,
  description,
  imageUrl,
  underrubrik,
  slug,
}) => (
  <a href={`/${slug}`}>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-2">
      {imageUrl && <img className="rounded-t-lg" src={imageUrl} alt="" />}
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

export default PortfolioPage;
