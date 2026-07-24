import { useState, type ChangeEvent } from "react";

type Bookmark = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
};

type SearchboxProps = {
  bookmarks: Bookmark[];
  onSearchResults: (filtered: Bookmark[]) => void;
};

export const Searchbox = ({ bookmarks, onSearchResults }: SearchboxProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);

    const normalized = value.trim().toLowerCase();

    const filtered = normalized
      ? bookmarks.filter((bookmark) => {
          const titleMatch = bookmark.title.toLowerCase().includes(normalized);
          const descriptionMatch = bookmark.description.toLowerCase().includes(normalized);
          const tagsMatch = bookmark.tags.some((tag) =>
            tag.toLowerCase().includes(normalized)
          );

          return titleMatch || descriptionMatch || tagsMatch;
        })
      : bookmarks;

    onSearchResults(filtered);
  };

  return (
    <section className="searchbox">
      <input
        id="searchbox"
        name="searchbox"
        value={query}
        onChange={handleChange}
        placeholder="Search title, description, tags"
        type="text"
      />
    </section>
  );
};
