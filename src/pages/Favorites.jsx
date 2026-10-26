import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (key) => {
    removeFavorite(key);
  };
  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((favorite) => {
          const bookId = favorite.key?.split("/").pop();
          return (
            <li key={favorite.key}>
              <p>Title: {favorite.title}</p>
              <Link to={`/books/${bookId}`}>Details</Link>
              <button type="button" onClick={() => handleRemove(favorite.key)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <p>Favorites: {favorites.length}</p>
    </div>
  );
};
export default Favorites;
