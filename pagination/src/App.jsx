import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://dummyjson.com/products?limit=200"
      );

      const data = await response.json();

      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  // Calculate indexes
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Get products for current page
  const currentProducts = products.slice(
    startIndex,
    endIndex
  );

  // Previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>Pagination</h1>

      <h2>Current Page: {currentPage}</h2>

      <div className="products">
        {currentProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          currentProducts.map((product) => (
            <div className="product" key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <h3>{product.title}</h3>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={currentPage === pageNumber ? "active" : ""}>
              {pageNumber}
            </button>
          )
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;