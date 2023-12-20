import * as React from "react";

interface SinglePageProps {
  title?: string;
  description?: React.ReactNode;
  imageUrl?: string | null;
}

const SinglePageComponent: React.FC<SinglePageProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <main
    className=""
    style={{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "500px",
    }}
  >
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
  </main>
);

export default SinglePageComponent;
