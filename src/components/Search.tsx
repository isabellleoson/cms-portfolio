import React, { useState, useEffect, ChangeEvent } from "react";
import { Index } from "elasticlunr";
import { Link } from "gatsby";

interface SearchProps {
  searchIndex: any;
}
interface SearchResult {
  titel: string;
  slug: string;
}

const Search: React.FC<SearchProps> = ({ searchIndex }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<Index<{ titel: string }> | null>(null);
  useEffect(() => {
    // Load the index when the component mounts
    if (!index) {
      setIndex(Index.load(searchIndex));
    }
  }, [index, searchIndex]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    if (index) {
      const searchResults = index
        .search(query, { expand: true })
        .map(
          ({ ref }: { ref: string }) =>
            index.documentStore.getDoc(ref) as SearchResult,
        );
      setResults(searchResults);
    }
  };

  console.log("results", results);

  return (
    <div className="">
      <form>
        <label aria-label="Inputfield for searching projects">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search projects..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 relative"
          />
        </label>
      </form>
      <ul className="rounded-b-lg text-end p-2">
        {results.length === 0 && query.length > 0 && (
          <li className="absolute rounded-b-lg text-end p-2 bg-white">
            No matches
          </li>
        )}
        {results.map((project) => (
          <li
            className="absolute rounded-b-lg text-end p-2 bg-white"
            key={project.slug}
          >
            <Link to={"/" + project.slug}>
              {project.slug}
              <p>{project.slug}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
