import { useEffect, useState, type ChangeEvent } from "react";
import { Text } from "./Text/Text";

type BookmarkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
};

type BookmarkFormValues = {
  title: string;
  description: string;
  url: string;
  tag: string;
};

const STORAGE_KEY = "link-vault-bookmarks";

export const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<BookmarkFormValues>({
    title: "",
    description: "",
    url: "",
    tag: "",
  });

  const saveBookmarks = (items: BookmarkItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("bookmarksUpdated"));
  };

  const loadBookmarks = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {
        setBookmarks([]);
      }
    } else {
      setBookmarks([]);
    }
  };

  useEffect(() => {
    loadBookmarks();

    const handleUpdate = () => loadBookmarks();
    window.addEventListener("bookmarksUpdated", handleUpdate);

    return () => {
      window.removeEventListener("bookmarksUpdated", handleUpdate);
    };
  }, []);

  const handleDelete = (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const handleEditStart = (bookmark: BookmarkItem) => {
    setEditingId(bookmark.id);
    setEditValues({
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tag: bookmark.tag,
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({
      title: "",
      description: "",
      url: "",
      tag: "",
    });
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    if (!editingId) return;

    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === editingId
        ? { ...bookmark, ...editValues }
        : bookmark
    );

    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
    setEditingId(null);
    setEditValues({
      title: "",
      description: "",
      url: "",
      tag: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "50rem",
          maxWidth: "1200px",
          background: "#ffffff",
          border: "1px solid #e4e4e4",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          padding: "24px",
        }}
      >
        <Text variant="h2">Bookmarks List</Text>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "14px",
            color: "#1d1d1f",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #e5e5e5",
                  padding: "12px 10px",
                  textAlign: "left",
                  background: "linear-gradient(180deg, #fff, #eeeeee)",
                  fontWeight: 600,
                  color: "#4a4a4a",
                }}
              >
                Title
              </th>
              <th
                style={{
                  borderBottom: "1px solid #e5e5e5",
                  padding: "12px 10px",
                  textAlign: "left",
                  background: "linear-gradient(180deg, #fff, #fffafa)",
                  fontWeight: 600,
                  color: "#4a4a4a",
                }}
              >
                Description
              </th>
              <th
                style={{
                  borderBottom: "1px solid #e5e5e5",
                  padding: "12px 10px",
                  textAlign: "left",
                  background: "linear-gradient(180deg, #f7f7f7, #eeeeee)",
                  fontWeight: 600,
                  color: "#4a4a4a",
                }}
              >
                URL
              </th>
              <th
                style={{
                  borderBottom: "1px solid #e5e5e5",
                  padding: "12px 10px",
                  textAlign: "left",
                  background: "linear-gradient(180deg, #f7f7f7, #eeeeee)",
                  fontWeight: 600,
                  color: "#4a4a4a",
                }}
              >
                Tag
              </th>
              <th
                style={{
                  borderBottom: "1px solid #e5e5e5",
                  padding: "12px 10px",
                  textAlign: "left",
                  background: "linear-gradient(180deg, #f7f7f7, #eeeeee)",
                  fontWeight: 600,
                  color: "#4a4a4a",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookmarks.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#6e6e73",
                  }}
                >
                  No bookmarks yet.
                </td>
              </tr>
            ) : (
              bookmarks.map((bookmark) => {
                const isEditing = editingId === bookmark.id;

                return (
                  <tr key={bookmark.id}>
                    <td
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        padding: "12px 10px",
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          name="title"
                          value={editValues.title}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            border: "1px solid #d1d1d6",
                            borderRadius: "8px",
                            padding: "8px 10px",
                          }}
                        />
                      ) : (
                        bookmark.title
                      )}
                    </td>

                    <td
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        padding: "12px 10px",
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          name="description"
                          value={editValues.description}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            border: "1px solid #d1d1d6",
                            borderRadius: "8px",
                            padding: "8px 10px",
                          }}
                        />
                      ) : (
                        bookmark.description
                      )}
                    </td>

                    <td
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        padding: "12px 10px",
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          name="url"
                          value={editValues.url}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            border: "1px solid #d1d1d6",
                            borderRadius: "8px",
                            padding: "8px 10px",
                          }}
                        />
                      ) : (
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#0071e3", textDecoration: "none" }}
                        >
                          {bookmark.url}
                        </a>
                      )}
                    </td>

                    <td
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        padding: "12px 10px",
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          name="tag"
                          value={editValues.tag}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            border: "1px solid #d1d1d6",
                            borderRadius: "8px",
                            padding: "8px 10px",
                          }}
                        />
                      ) : (
                        bookmark.tag
                      )}
                    </td>

                    <td
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        padding: "12px 10px",
                      }}
                    >
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={handleEditSave}
                            style={{
                              border: "none",
                              borderRadius: "999px",
                              padding: "8px 12px",
                              background: "#000",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            style={{
                              border: "1px solid #d1d1d6",
                              borderRadius: "999px",
                              padding: "8px 12px",
                              background: "#fff",
                              color: "#1d1d1f",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handleEditStart(bookmark)}
                            style={{
                              border: "1px solid #d1d1d6",
                              borderRadius: "999px",
                              padding: "8px 12px",
                              background: "#fff",
                              color: "#1d1d1f",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(bookmark.id)}
                            style={{
                              border: "none",
                              borderRadius: "999px",
                              padding: "8px 12px",
                              background: "#000",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
