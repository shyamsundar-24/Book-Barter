// client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2><i className="bi bi-book-half text-primary"></i> Available Books</h2>
          <p className="text-muted">Browse and exchange books with other readers</p>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle me-2"></i>
          {search ? "No books found matching your search." : "No books available yet. Be the first to add one!"}
        </div>
      ) : (
        <div className="row">
          {filteredBooks.map(b => (
            <div key={b._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={`http://localhost:5000/uploads/${b.image}`}
                  className="card-img-top"
                  alt={b.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" title={b.title}>{b.title}</h5>
                  <p className="card-text text-muted mb-1">
                    <i className="bi bi-person"></i> {b.author}
                  </p>
                  <p className="card-text">
                    <span className="badge bg-secondary">{b.genre || "General"}</span>
                    <span className="badge bg-info ms-1">{b.condition || "Good"}</span>
                  </p>
                  <Link to={`/book/${b._id}`} className="btn btn-primary btn-sm mt-auto">
                    <i className="bi bi-eye me-1"></i>View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
