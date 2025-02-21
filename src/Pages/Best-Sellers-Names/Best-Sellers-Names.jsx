import { useEffect, useState } from "react";

function BestSellersNames() {
  const [names, setNames] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=aIE8FOr4UDycA3Qu8GwQ0Lxo9zn6zg71`
    )
      .then((response) => response.json())
      .then((data) => {
        const namesArray = [];
        data.results.forEach((item) => namesArray.push(item.display_name));
        setNames(namesArray);
        setSelectedName(namesArray[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <select value={selectedName} name="names" onChange={(e) => setSelectedName(e.target.value)}>
      {names.map((name, index) => (
        <option key={index} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default BestSellersNames;
