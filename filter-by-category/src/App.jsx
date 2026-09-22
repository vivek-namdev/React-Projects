import React, { useEffect, useState } from 'react'

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");

    const data = await response.json();

    setProducts(data.products);

    const uniqueCategories = [
      ...new Set(data.products.map((product) => product.category))
    ];

    setCategories(uniqueCategories);

  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const filteredProducts = selectedCategory === "all" ?
  products : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <h1>products</h1>

      <div>

        <button
        onClick={() => setSelectedCategory("all")}>
          All Products
        </button>

        {
          categories.map((category) => (
            <button
            key={category}
            onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))
        }
      </div>

      {filteredProducts.map((product) => (
        <div key={product.id}>
          <img 
          src={product.thumbnail} 
          alt={product.title} 
          width={150}
          />

          <h2>{product.title}</h2>

          <p>${product.price}</p>
        </div>
      ))}

    </div>
  )
}

export default App
