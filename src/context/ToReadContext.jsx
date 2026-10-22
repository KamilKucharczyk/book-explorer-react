import { createContext, useEffect, useState } from "react";

export const ToReadContext = createContext();

const ToReadProvider = ({ children }) => {
  const initialToRead = localStorage.getItem("toRead");
  const [toRead, setToRead] = useState(
    initialToRead ? JSON.parse(initialToRead) : [],
  );

  const addToRead = (book) => {
    const existedBook = toRead.some((item) => item.key === book.key);
    if (!existedBook) {
      const newToRead = [...toRead, { ...book, read: false }];
      setToRead(newToRead);
    }
  };

  const removeFromRead = (key) => {
    const filteredToRead = toRead.filter((item) => item.key !== key);
    setToRead(filteredToRead);
  };

  const toggleRead = (key) => {
    setToRead((toRead) =>
      toRead.map((book) =>
        book.key === key ? { ...book, read: !book.read } : book,
      ),
    );
  };

  const clearReadList = () => {
    setToRead([]);
  };

  useEffect(() => {
    localStorage.setItem("toRead", JSON.stringify(toRead));
  }, [toRead]);

  return (
    <ToReadContext.Provider
      value={{ toRead, addToRead, removeFromRead, toggleRead, clearReadList }}
    >
      {children}
    </ToReadContext.Provider>
  );
};

export default ToReadProvider;
