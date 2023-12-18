import * as React from "react";

interface PortfolioPageProps {
  title?: string;
  description?: React.ReactNode;
  imageUrl?: string | null;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      {imageUrl && (
        <img className="rounded-t-lg" src={imageUrl} alt="" width="200" />
      )}
    </a>
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

export default PortfolioPage;
