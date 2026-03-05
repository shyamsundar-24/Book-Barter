import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const [myBooks, setMyBooks] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    Promise.all([
      api.get("/books/my", { headers }),
      api.get("/trades/incoming", { headers }),
      api.get("/trades/sent", { headers })
    ])
      .then(([booksRes, incomingRes, sentRes]) => {
        setMyBooks(booksRes.data);
        setIncoming(incomingRes.data);
        setSent(sentRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const acceptTrade = async (id) => {
    try {
      await api.put(`/trades/${id}/accept`, {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to accept trade");
    }
  };

  const rejectTrade = async (id) => {
    try {
      await api.put(`/trades/${id}/reject`, {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to reject trade");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4"><i className="bi bi-speedometer2 text-primary"></i> Dashboard</h1>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="bi bi-book-fill text-primary" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-2">{myBooks.length}</h3>
              <p className="text-muted mb-0">My Books</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="bi bi-arrow-down-circle text-success" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-2">{incoming.length}</h3>
              <p className="text-muted mb-0">Incoming Requests</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <i className="bi bi-arrow-up-circle text-info" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-2">{sent.length}</h3>
              <p className="text-muted mb-0">Sent Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Books */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="bi bi-book"></i> My Books</h4>
          <Link to="/addbook" className="btn btn-light btn-sm">
            <i className="bi bi-plus-circle"></i> Add Book
          </Link>
        </div>
        <div className="card-body">
          {myBooks.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              You haven't added any books yet. <Link to="/addbook">Add your first book</Link>
            </div>
          ) : (
            <div className="row">
              {myBooks.map(b => (
                <div key={b._id} className="col-md-4 col-lg-3 mb-3">
                  <div className="card h-100">
                    <img
                      src={`http://localhost:5000/uploads/${b.image}`}
                      className="card-img-top"
                      alt={b.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title text-truncate" title={b.title}>{b.title}</h6>
                      <p className="card-text text-muted small mb-0">{b.author}</p>
                      <span className="badge bg-secondary mt-2">{b.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Incoming Trades */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0"><i className="bi bi-arrow-down-circle"></i> Incoming Trade Requests</h4>
        </div>
        <div className="card-body">
          {incoming.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              No incoming trade requests.
            </div>
          ) : (
            <div className="row">
              {incoming.map(t => (
                <div key={t._id} className="col-md-6 mb-3">
                  <div className="card border-success">
                    <div className="card-body">
                      <h5 className="card-title">Trade Request</h5>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-muted small mb-1">They Offer:</p>
                          <p className="fw-bold">{t.offeredBook?.title || "N/A"}</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted small mb-1">They Want:</p>
                          <p className="fw-bold">{t.requestedBook?.title || "N/A"}</p>
                        </div>
                      </div>
                      <p className="mb-2">
                        <span className={`badge ${t.status === "Pending" ? "bg-warning" : t.status === "Accepted" ? "bg-success" : "bg-danger"}`}>
                          {t.status}
                        </span>
                      </p>
                      {t.status === "Pending" && (
                        <div className="d-flex gap-2">
                          <button onClick={() => acceptTrade(t._id)} className="btn btn-success btn-sm flex-fill">
                            <i className="bi bi-check-circle"></i> Accept
                          </button>
                          <button onClick={() => rejectTrade(t._id)} className="btn btn-danger btn-sm flex-fill">
                            <i className="bi bi-x-circle"></i> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sent Trades */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0"><i className="bi bi-arrow-up-circle"></i> Sent Trade Requests</h4>
        </div>
        <div className="card-body">
          {sent.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              You haven't sent any trade requests yet.
            </div>
          ) : (
            <div className="row">
              {sent.map(t => (
                <div key={t._id} className="col-md-6 mb-3">
                  <div className="card border-info">
                    <div className="card-body">
                      <h5 className="card-title">Sent Trade</h5>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-muted small mb-1">Your Book:</p>
                          <p className="fw-bold">{t.offeredBook?.title || "N/A"}</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted small mb-1">Requested Book:</p>
                          <p className="fw-bold">{t.requestedBook?.title || "N/A"}</p>
                        </div>
                      </div>
                      <p className="mb-0">
                        <span className={`badge ${t.status === "Pending" ? "bg-warning" : t.status === "Accepted" ? "bg-success" : "bg-danger"}`}>
                          {t.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
