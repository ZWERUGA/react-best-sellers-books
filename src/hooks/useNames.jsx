import { useEffect, useState } from "react";

function useNames() {
  const [names, setNames] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=aIE8FOr4UDycA3Qu8GwQ0Lxo9zn6zg71`
    )
      .then((response) => response.json())
      .then((data) => {
        const namesArray = [];
        data.results.forEach(({ list_name }) => namesArray.push(list_name));
        setNames(namesArray);
        setSelectedName(namesArray[0]);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  return {
    names,
    isLoading,
    fetchError,
    selectedName,
    setSelectedName,
  };
}

export default useNames;
