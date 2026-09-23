import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "./Text/Text";
import { useForm } from "./useForm";

type BookmarkFormValues = {
  title: string;
  description: string;
  url: string;
  tag: string;
};

type BookmarkItem = BookmarkFormValues & { id: string };
type FormErrors = Partial<Record<keyof BookmarkFormValues, string>>;

const STORAGE_KEY = "link-vault-bookmarks";

const validate = (values: BookmarkFormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.title.trim()) errors.title = "Enter a bookmark title.";
  if (!values.description.trim()) errors.description = "Enter a description.";
  const url = values.url.trim();
  if (!url || /^https?:\/\/$/i.test(url)) {
    errors.url = "Enter a complete URL, such as http://example.com.";
  } else if (!/^https?:\/\/[^\s]+$/i.test(url)) {
    errors.url = "Start the URL with http:// or https:// and remove any spaces.";
  } else {
    try {
      const parsed = new URL(url);
      if (!parsed.hostname) errors.url = "Enter a valid website address.";
    } catch {
      errors.url = "Enter a valid URL, such as https://example.com.";
    }
  }
  const tags = values.tag.split(",").map((tag) => tag.trim());
  if (!values.tag.trim()) {
    errors.tag = "Enter at least one tag, such as work or learning.";
  } else if (tags.some((tag) => !tag)) {
    errors.tag = "Enter a tag between each comma and remove any trailing comma.";
  } else if (new Set(tags.map((tag) => tag.toLowerCase())).size !== tags.length) {
    errors.tag = "Remove duplicate tags.";
  }
  return errors;
};

export const BookmarkForm = () => {
  const navigate = useNavigate();
  const { inputValues, handleInputChange, resetForm } = useForm<BookmarkFormValues>({
    title: "",
    url: "http://",
    description: "",
    tag: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveError, setSaveError] = useState("");
  const tags = inputValues.tag.split(",").map((tag) => tag.trim()).filter(Boolean);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.currentTarget.name as keyof BookmarkFormValues;
    const value = event.currentTarget.value;
    handleInputChange(event);
    if (errors[field]) {
      const nextErrors = validate({ ...inputValues, [field]: value });
      setErrors((previous) => ({ ...previous, [field]: nextErrors[field] }));
    }
    setSaveError("");
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.currentTarget.name as keyof BookmarkFormValues;
    setErrors((previous) => ({ ...previous, [field]: validate(inputValues)[field] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(inputValues);
    setErrors(nextErrors);
    const firstInvalidField = (Object.keys(nextErrors) as (keyof BookmarkFormValues)[])[0];
    if (firstInvalidField) {
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    const bookmark: BookmarkFormValues = {
      title: inputValues.title.trim(),
      description: inputValues.description.trim(),
      url: inputValues.url.trim(),
      tag: tags.join(", "),
    };
    try {
      const existingBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as BookmarkItem[];
      const newBookmark: BookmarkItem = {
        ...bookmark,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingBookmarks, newBookmark]));
      window.dispatchEvent(new Event("bookmarksUpdated"));
    } catch {
      setSaveError("Your bookmark could not be saved. Please try again.");
      return;
    }
    resetForm();
    navigate("/");
  };

  return (
    <div className="form-card bookmark-form-card">
      <Text variant="h1">Add Bookmark</Text>
      <form onSubmit={handleSubmit} noValidate>
        <p className="form-hint">All fields are required.</p>
        {(["title", "url", "description", "tag"] as const).map((field) => (
          <div className="bookmark-field" key={field}>
            <label htmlFor={`bookmark-${field}`}>
              {{ title: "Title", url: "URL", description: "Description", tag: "Tags" }[field]}
            </label>
            <input
              id={`bookmark-${field}`}
              type={field === "url" ? "url" : "text"}
              name={field}
              value={inputValues[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={{
                title: "e.g. React documentation",
                url: "http://example.com",
                description: "What is this bookmark about?",
                tag: "e.g. react, learning",
              }[field]}
              required
              aria-invalid={Boolean(errors[field])}
              aria-describedby={[
                field === "url" || field === "tag" ? `bookmark-${field}-hint` : "",
                errors[field] ? `bookmark-${field}-error` : "",
              ].filter(Boolean).join(" ") || undefined}
            />
            {field === "url" && (
              <p id="bookmark-url-hint" className="form-hint">Use a complete link starting with http:// or https://.</p>
            )}
            {field === "tag" && (
              <>
                <p id="bookmark-tag-hint" className="form-hint">Separate tags with commas, for example: react, learning.</p>
                {tags.length > 0 && (
                  <ul className="bookmark-tag-preview" aria-label="Tag preview">
                    {tags.map((tag, index) => <li className="bookmark-tag" key={index}>{tag}</li>)}
                  </ul>
                )}
              </>
            )}
            {errors[field] && (
              <p id={`bookmark-${field}-error`} className="form-error" role="alert">{errors[field]}</p>
            )}
          </div>
        ))}
        {saveError && <p className="form-error" role="alert">{saveError}</p>}
        <div className="buttons">
          <button type="button" onClick={() => navigate("/")} className="secondary-btn">Back</button>
          <button type="submit" className="primary-btn">Save</button>
        </div>
      </form>
    </div>
  );
};
