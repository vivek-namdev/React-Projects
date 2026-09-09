import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      const data = await response.json();

      setCharacters(data.results);
    } catch (error) {
      setError("Failed to fetch characters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  
  // Search + Status filtering
  let filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || character.status === status;

    return matchesSearch && matchesStatus;
  });

  // Sorting
  filteredCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortOrder === "az") {
      return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);
  });

  if (loading) {
    return (
      <div className="container" data-testid="loading">
        <h1>Rick And Morty Characters Viewer</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" data-testid="error-message">
        <h1>Rick And Morty Characters Viewer</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Rick And Morty Characters Viewer</h1>

      <div className="controls">

        {/* Search */}
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-input"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          data-testid="status-filter"
        >
          <option value="all">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          data-testid="sort-order"
        >
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>

      </div>

      {/* Results */}
      {filteredCharacters.length === 0 ? (
        <p className="no-results">
          No Characters found
        </p>
      ) : (
        <div className="characters-grid">
          {filteredCharacters.map((character) => (
            <div
              className="card"
              key={character.id}
              data-testid={`character-${character.id}`}
            >
              <img
                src={character.image}
                alt={character.name}
              />

              <div className="card-content">
                <h2 className="char-name">
                  {character.name}
                </h2>

                <p className="char-status">
                  Status: {character.status}
                </p>

                <p className="char-species">
                  Species: {character.species}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;