// client/src/pages/AddBook.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddBook() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("Good");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Please provide a title and author.");
      return;
    }
    if (!token) {
      alert("Login required.");
      nav("/login");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    fd.append("author", author);
    fd.append("genre", genre);
    fd.append("condition", condition);
    if (image) fd.append("image", image);

    setLoading(true);
    try {
      await api.post("/books", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      });
      alert("Book added successfully!");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">
                <i className="bi bi-plus-circle text-success"></i> Add New Book
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Book Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter book title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter author name"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Fiction, Science, History"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Condition</label>
                  <select
                    className="form-select"
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Book Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {preview && (
                    <div className="mt-3 text-center">
                      <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: "200px" }} />
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>Adding Book...</>
                    ) : (
                      <><i className="bi bi-check-circle me-2"></i>Add Book</>
                    )}
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => nav("/dashboard")}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
