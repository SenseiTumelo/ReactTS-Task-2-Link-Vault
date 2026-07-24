import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Text } from "./Text/Text";
import noDataImg from "../assets/Capture.png";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
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

  const handleDeleteRequest = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (!confirmDeleteId) return;

    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== confirmDeleteId
    );
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
    setConfirmDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
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

  const handleEditSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId) return;

    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === editingId ? { ...bookmark, ...editValues } : bookmark
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

  const bookmarkToDelete = bookmarks.find(
    (bookmark) => bookmark.id === confirmDeleteId
  );

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
        <Text
          variant="h2"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: 600,
            color: "#1d1d1f",
            marginBottom: "24px",
          }}
        >
          Bookmarks List
        </Text>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
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
                  <img
                    src={noDataImg}
                    style={{ width: "20rem", height: "auto", marginTop: "8px" }}
                  />
                  <Text
                    variant="p"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={() => navigate("/create-bookmark")}
                    >
                      Add Bookmark
                    </button>
                  </Text>
                </td>
              </tr>
            ) : (
              bookmarks.map((bookmark) => (
                <tr key={bookmark.id}>
                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "12px 10px",
                    }}
                  >
                    {bookmark.title}
                  </td>

                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "12px 10px",
                    }}
                  >
                    {bookmark.description}
                  </td>

                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "12px 10px",
                    }}
                  >
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0071e3", textDecoration: "none" }}
                    >
                      {bookmark.url}
                    </a>
                  </td>

                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "12px 10px",
                    }}
                  >
                    {bookmark.tag}
                  </td>

                  <td
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "12px 10px",
                    }}
                  >
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
                        onClick={() => handleDeleteRequest(bookmark.id)}
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {confirmDeleteId && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.35)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "min(90%, 420px)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <Text variant="h3" style={{ marginBottom: "16px" }}>
                Confirm delete
              </Text>
              <Text
                variant="p"
                style={{
                  color: "#4a4a4a",
                  marginBottom: "24px",
                }}
              >
                Delete "{bookmarkToDelete?.title}" from your bookmarks?
              </Text>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    background: "#000",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Yes, delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  style={{
                    border: "1px solid #d1d1d6",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    background: "#fff",
                    color: "#1d1d1f",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {editingId && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.35)",
              zIndex: 10,
            }}
          >
            <form
              onSubmit={handleEditSave}
              style={{
                width: "min(90%, 540px)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                display: "grid",
                gap: "16px",
              }}
            >
              <Text
                variant="h3"
                style={{
                  marginBottom: "4px",
                  textAlign: "center",
                }}
              >
                Edit bookmark
              </Text>

              <label
                style={{
                  display: "grid",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#1d1d1f",
                }}
              >
                Title
                <input
                  type="text"
                  name="title"
                  value={editValues.title}
                  onChange={handleEditChange}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d1d6",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />
              </label>

              <label
                style={{
                  display: "grid",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#1d1d1f",
                }}
              >
                Description
                <input
                  type="text"
                  name="description"
                  value={editValues.description}
                  onChange={handleEditChange}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d1d6",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />
              </label>

              <label
                style={{
                  display: "grid",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#1d1d1f",
                }}
              >
                URL
                <input
                  type="text"
                  name="url"
                  value={editValues.url}
                  onChange={handleEditChange}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d1d6",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />
              </label>

              <label
                style={{
                  display: "grid",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#1d1d1f",
                }}
              >
                Tag
                <input
                  type="text"
                  name="tag"
                  value={editValues.tag}
                  onChange={handleEditChange}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d1d6",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />
              </label>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleEditCancel}
                  style={{
                    border: "1px solid #d1d1d6",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    background: "#fff",
                    color: "#1d1d1f",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    background: "#000",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
