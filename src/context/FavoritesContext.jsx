import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const existedFavorites = localStorage.getItem("favorites");
  const [favorites, setFavorites] = useState(
    existedFavorites ? JSON.parse(existedFavorites) : [],
  );

  const addFavorite = (book) => {
    const addedBook = favorites.some((item) => item.key === book.key);
    if (!addedBook) {
      const newFavorites = [...favorites, book];
      setFavorites(newFavorites);
    }
  };

  const removeFavorite = (key) => {
    const filteredFavorites = favorites.filter((item) => item.key !== key);
    setFavorites(filteredFavorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
export default FavoritesProvider;
