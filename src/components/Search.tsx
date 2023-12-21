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

// Search component
const Search: React.FC<SearchProps> = ({ searchIndex }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<Index<{ titel: string }> | null>(null);

  console.log("indexStart", index);
  console.log("searchIndexStart", searchIndex);

  useEffect(() => {
    // Load the index when the component mounts
    if (!index) {
      setIndex(Index.load(searchIndex));
    }
  }, [index, searchIndex]);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setQuery(query);
    if (index) {
      const searchResults = index
        .search(query, { expand: true })
        .map(
          ({ ref }: { ref: string }) =>
            index.documentStore.getDoc(ref) as SearchResult,
        );
      console.log("setResults", searchResults);
      setResults(searchResults);
    }
  };

  console.log("results", results);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
      />
      <ul>
        {results.map((page) => (
          <li key={page.slug}>
            <Link className="p-2 text-base font-extrabold" to={"/" + page.slug}>{page.slug}</Link>
            {/* {": " + page.tags.join(`,`)} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
