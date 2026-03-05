// client/src/pages/BookDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function BookDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [book, setBook] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [selectedOfferedBook, setSelectedOfferedBook] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch requested book details
    api.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));

    // fetch user's own books to offer
    if (token) {
      api.get("/books/my", {
        headers: { Authorization: "Bearer " + token }
      })
        .then(res => setMyBooks(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleProposeTrade = async () => {
    if (!selectedOfferedBook) {
      alert("Select one of your books to offer.");
      return;
    }
    if (!token) {
      alert("You must be logged in.");
      nav("/login");
      return;
    }
    setLoading(true);
    try {
      // receiver is the owner of the requested book
      const receiverId = book.owner?._id || book.owner;
      const payload = {
        offeredBook: selectedOfferedBook,
        requestedBook: id,
        receiver: receiverId
      };
      await api.post("/trades", payload, {
        headers: { Authorization: "Bearer " + token }
      });
      alert("Trade proposed!");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to propose trade.");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <div style={{ padding: 20 }}>Loading book...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{book.title}</h2>
      <img
        alt={book.title}
        src={`http://localhost:5000/uploads/${book.image}`}
        width="200"
        style={{ display: "block", marginBottom: 12 }}
      />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Condition:</strong> {book.condition}</p>
      <p><strong>Owner:</strong> {book.owner?.name || "User"}</p>

      <hr />

      <h3>Propose a trade</h3>
      {myBooks.length === 0 ? (
        <p>You have no books to offer. Add books first.</p>
      ) : (
        <>
          <label>
            Choose one of your books to offer:
            <select
              value={selectedOfferedBook}
              onChange={(e) => setSelectedOfferedBook(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="">-- select --</option>
              {myBooks.map((mb) => (
                <option key={mb._id} value={mb._id}>
                  {mb.title} — {mb.condition}
                </option>
              ))}
            </select>
          </label>
          <div style={{ marginTop: 12 }}>
            <button onClick={handleProposeTrade} disabled={loading}>
              {loading ? "Proposing..." : "Propose Trade"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
