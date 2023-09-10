import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://fakestoreapi.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const fetchedData = async () => {
    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  };

  // Filter Products Based on the Search Keywords
  const filterThroughLowerCase = products.filter((product) => {
    return product.title.toLowerCase().includes(searchItem.toLowerCase());
  });
  const filterThroughUpperCase = products.filter((product) => {
    return product.title.toUpperCase().includes(searchItem.toUpperCase());
  });

  useEffect(() => {
    fetchedData();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterThroughLowerCase);
    setFilteredProducts(filterThroughUpperCase);
  }, [searchItem, products]);

  return (
    <div className="App">
      <div className="navbar">
        <h1>E-commerce Product Page</h1>
        <input
          type="search"
          placeholder="Search Products..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="img-container">
              <img src={product.image} alt={product.title} />
            </div>
            <h2>{product.title}</h2>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
