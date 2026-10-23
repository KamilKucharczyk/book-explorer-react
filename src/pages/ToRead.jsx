import useToRead from "../hooks/useToRead";

const ToRead = () => {
  const { toRead, removeFromRead, toggleRead } = useToRead();

  const allBooks = toRead.length;
  const readBooks = toRead.filter((item) => item.read === true).length;
  const notRead = allBooks - readBooks;
  let progress = 0;
  if (allBooks !== 0) {
    progress = (readBooks / allBooks) * 100;
  }

  return (
    <div>
      <ul>
        {toRead.map((item) => (
          <li key={item.key}>
            <p>Title: {item.title}</p>
            <button type="button" onClick={() => toggleRead(item.key)}>
              {item.read ? "Mark as not read" : "Mark as read"}
            </button>
            <button type="button" onClick={() => removeFromRead(item.key)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>All books: {allBooks}</p>
      <p>Read: {readBooks}</p>
      <p>Not read: {notRead}</p>
      <p>Progress: {progress} %</p>
    </div>
  );
};
export default ToRead;
