import type { ChangeEvent } from "react";

type SearchboxProps = {
  query: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Searchbox = ({ query, onChange }: SearchboxProps) => {
  return (
    <section className="searchbox">
      <input
        id="searchbox"
        name="searchbox"
        value={query}
        onChange={onChange}
        aria-label="Search bookmarks"
        placeholder="Search title, description, tags or link"
        type="text"
      />
    </section>
  );
};
