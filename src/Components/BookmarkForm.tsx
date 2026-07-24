import { useNavigate } from "react-router-dom";
import { Text } from "./Text/Text";
import { useForm } from "./useForm";

type BookmarkFormValues = {
  title: string;
  description: string;
  url: string;
  tag: string;
};

export const BookmarkForm = () => {
  const navigate = useNavigate();
  const { inputValues, handleInputChange, resetForm } = useForm<BookmarkFormValues>({
    title: "",
    url: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // submitBookmark(inputValues);
    console.log("Bookmark submitted:", inputValues);
    resetForm();
  };

  return (
    <div className="form-card">
      <Text variant="h1">Add Bookmark</Text>
      <button onClick={() => navigate('/')}>Back</button>
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

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
