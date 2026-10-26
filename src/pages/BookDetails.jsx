import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import useToRead from "../hooks/useToRead";

const API_DETAILS_URL = "https://openlibrary.org/works/";
const COVER_URL = "https://covers.openlibrary.org/b/id/";

const BookDetails = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addFavorite } = useFavorites();
  const { addToRead } = useToRead();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API_DETAILS_URL}${id}.json`);
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate(location.state?.from || "/books");
  };

  const handleAddToFav = () => {
    addFavorite(details);
  };

  const handleAddToRead = () => {
    addToRead(details);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>No details found</p>;
  }

  const bookCover = `${COVER_URL}${details.covers?.[0]}-M.jpg`;

  return (
    <div>
      <h1>Book details</h1>
      <p>Title: {details.title}</p>
      <p>
        Description:{" "}
        {typeof details.description === "string"
          ? details.description
          : details.description?.value}
      </p>
      <p>Subjects: {details.subjects?.join(", ")}</p>
      <img src={bookCover} alt={details.title} />
      <button type="button" onClick={handleBack}>
        Go Back
      </button>
      <button type="button" onClick={handleAddToFav}>
        Add to favorites
      </button>
      <button type="button" onClick={handleAddToRead}>
        Add to read list
      </button>
    </div>
  );
};
export default BookDetails;
