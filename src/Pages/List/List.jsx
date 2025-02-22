import { useState } from "react";
import useNames from "../../hooks/useNames";
import Spinner from "../../components/Spinner/Spinner";
import { FaExternalLinkAlt } from "react-icons/fa";

import styles from "./List.module.css";
import { API_KEY } from "../../consts";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router";

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
        `https://api.nytimes.com/svc/books/v3/lists/current/${selectedName}.json?api-key=${API_KEY}`
      );
      const json = await response.json();
      setBooks(json.results.books);
      setBestsellersDate(json.results.bestsellers_date);
      setLoadingBooks(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingNames) {
    return (
      <div className={styles.listSpinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Best Sellers Names */}
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
          {books.length > 0 && (
            <span className={styles.bestSellersDate}>Bestsellers list date: {bestsellersDate}</span>
          )}
        </div>
      ) : (
        <ErrorMessage message="Error fetching best sellers names..." />
      )}

      {/* Best Sellers Books */}
      {!isLoadingBooks ? (
        <ul className={styles.list}>
          {books.map((book) => (
            <li key={book.primary_isbn10} className={styles.listItem}>
              <Link to={book.amazon_product_url} className={styles.listLink} target="_blank">
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
                <FaExternalLinkAlt className={styles.listItemLinkIcon} color="#294d5c" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.listSpinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default List;
