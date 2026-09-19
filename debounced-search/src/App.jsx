import React, { useEffect, useState } from 'react'

const App = () => {
  const [search, setSearch] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Searching for: ", search);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [search]);


  return (
    <div>
      <h2>Debounced Search</h2>
      <input 
      type="text" 
      placeholder='Search'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <p>Result: {search}</p>
    </div>
  )
}

export default App
