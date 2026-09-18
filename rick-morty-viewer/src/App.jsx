import React, { useEffect, useMemo, useState } from 'react'
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("A-Z");


  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => setCharacters(data.results))
  }, []);



  const filteredCharacters = useMemo(() => {
  return [...characters]
  .filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase());
      })
      .filter((character) => {
        return status === "All" || status === character.status;
      })
      .sort((a, b) => {
        if(sortOrder === "A-Z") {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
    }, [characters, search, status, sortOrder]);

  return (
    <div>
      <h1 className='app'>Rick & Morty Character Viewer</h1>

      <div className='search-bar'>
      <input type="text" 
      placeholder='Search Chracter...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <select 
      value={status} 
      onChange={(e) => setStatus(e.target.value)}>
        <option value="All">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select 
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      </div>

{filteredCharacters.length === 0  ? (
  <p className='found'>No Characters Found!👎</p>
) : (
<div className='characters'>
      {filteredCharacters.map((character) => { 
        return (
        <div className='characters-card' key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt="character-image"/>
          <p>{character.status}</p>
          <p>{character.species}</p>
        </div>
      )
      })}
     </div>
)}
     </div>
  )
}

export default App
