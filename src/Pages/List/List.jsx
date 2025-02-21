import { useState } from "react";
import useNames from "../../hooks/useNames";

import styles from "./List.module.css";

function List() {
  const [books, setBooks] = useState([]);
  const [bestsellersDate, setBestsellersDate] = useState("");
  const [isLoadingBooks, setLoadingBooks] = useState(false);

  const {
    names,
    isLoading: isLoadingNames,
    fetchError: fetchErrorNames,
    selectedName,
    setSelectedName,
  } = useNames();

  const handleButtonClick = async () => {
    try {
      setLoadingBooks(true);
      const response = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${selectedName}.json?api-key=aIE8FOr4UDycA3Qu8GwQ0Lxo9zn6zg71`
      );
      const json = await response.json();
      setBooks(json.results.books);
      setBestsellersDate(json.results.bestsellers_date);
      setLoadingBooks(false);
    } catch {
      setFetchError(true);
    }
  };

  if (isLoadingNames) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.pageContainer}>
      {!fetchErrorNames ? (
        <div className={styles.namesContainer}>
          <label htmlFor="names" className={styles.namesLabel}>
            Choose list name:
          </label>
          <select
            value={selectedName}
            id="names"
            name="names"
            onChange={(e) => setSelectedName(e.target.value)}
            className={styles.namesSelect}
          >
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleButtonClick} className={styles.namesButton}>
            Get list
          </button>
        </div>
      ) : (
        <h1>Fetch error names...</h1>
      )}
      {!isLoadingBooks ? (
        <ul className={styles.list}>
          {books.map((book) => (
            <li key={book.primary_isbn10} className={styles.listItem}>
              <img
                src={book.book_image}
                alt={book.title}
                width={150}
                height={200}
                className={styles.listItemImage}
              />
              <h2 className={styles.listItemTitle}>{book.title}</h2>
              <div className={styles.listItemDescription}>
                <p>{book.description}</p>
              </div>
              <h3 className={styles.listItemAuthor}>{book.author}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading books...</h1>
      )}
    </div>
  );
}

export default List;
