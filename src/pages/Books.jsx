import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";

const API_URL = "https://openlibrary.org/search.json?q=";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const language = searchParams.get("language") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(
          `${API_URL}${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
        );
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const data = await response.json();
        setBooks(data.docs);
        setTotalResults(data.numFound);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [search, page]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSelect = language ? book.language?.includes(language) : true;
    return matchesSearch && matchesSelect;
  });

  const sortedBooks = [...filteredBooks];

  if (sort === "A-Z") {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "Z-A") {
    sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === "Oldest") {
    sortedBooks.sort((a, b) => a.first_publish_year - b.first_publish_year);
  } else if (sort === "Newest") {
    sortedBooks.sort((a, b) => b.first_publish_year - a.first_publish_year);
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      setSearchParams({ search: searchValue, language, sort, page: 1 });
    } else {
      setSearchParams({ language, sort, page: 1 });
    }
  };

  const handleSelect = (e) => {
    const languageValue = e.target.value;
    if (languageValue) {
      setSearchParams({ search, language: languageValue, sort, page: 1 });
    } else {
      setSearchParams({ search, sort, page: 1 });
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue) {
      setSearchParams({ search, language, sort: sortValue, page: 1 });
    } else {
      setSearchParams({ search, language, page: 1 });
    }
  };

  const totalPages = Math.ceil(totalResults / limit);

  const handlePrev = () => {
    if (page > 1) {
      setSearchParams({ search, language, sort, page: page - 1 });
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setSearchParams({ search, language, sort, page: page + 1 });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (books.length === 0) {
    return <p>No books found</p>;
  }
  return (
    <div>
      <h1>Books explorer</h1>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        placeholder="search title"
      />
      <select value={language} onChange={handleSelect}>
        <option value="">All</option>
        <option value="eng">English</option>
        <option value="pol">Polish</option>
        <option value="ger">German</option>
        <option value="fre">French</option>
      </select>
      <select value={sort} onChange={handleSort}>
        <option value="">Default</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Oldest">Oldest</option>
        <option value="Newest">Newest</option>
      </select>
      {sortedBooks.length === 0 && <p>No books found</p>}
      <ul>
        {sortedBooks.map((sortedBook) => (
          <li key={sortedBook.key}>
            <BookCard sortedBook={sortedBook} />
          </li>
        ))}
      </ul>
      <p>Page: {page}</p>
      <button type="button" onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      <button
        type="button"
        onClick={handleNext}
        disabled={page === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};
export default Books;
