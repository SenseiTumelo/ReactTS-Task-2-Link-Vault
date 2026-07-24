import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "./Text/Text";
import { useForm } from "./useForm";

type BookmarkFormValues = {
  title: string;
  description: string;
  url: string;
  tag: string;
};

type BookmarkItem = BookmarkFormValues & {
  id: string;
};

const STORAGE_KEY = "link-vault-bookmarks";

export const BookmarkForm = () => {
  const navigate = useNavigate();
  const { inputValues, handleInputChange, resetForm } = useForm<BookmarkFormValues>({
    title: "",
    url: "",
    description: "",
    tag: "",
  });

  const saveBookmark = (bookmark: BookmarkFormValues) => {
    const existingBookmarks = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    ) as BookmarkItem[];

    const newBookmark: BookmarkItem = {
      ...bookmark,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    const updatedBookmarks = [...existingBookmarks, newBookmark];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookmarks));

    window.dispatchEvent(new Event("bookmarksUpdated"));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveBookmark(inputValues);
    resetForm();
    navigate("/");
  };

  return (
    <div className="form-card">
      <Text variant="h1">Add Bookmark</Text>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputValues.title}
          onChange={handleInputChange}
          placeholder="Title"
        />

        <input
          type="text"
          name="url"
          value={inputValues.url}
          onChange={handleInputChange}
          placeholder="URL"
        />

        <input
          type="text"
          name="description"
          value={inputValues.description}
          onChange={handleInputChange}
          placeholder="Description"
        />

        <input
          type="text"
          name="tag"
          value={inputValues.tag}
          onChange={handleInputChange}
          placeholder="Tag"
        />
          <div className="buttons">
            <button onClick={() => navigate("/")} className="secondary-btn">Back</button> 
            <button type="submit" className="primary-btn">
              Save
            </button>
          </div>
        
      </form>
    </div>
  );
};





