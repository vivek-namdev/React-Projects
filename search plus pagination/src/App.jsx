import React, { useEffect, useState } from 'react'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [perPage, setPerPage] = useState(5);


  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if(!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        setPosts(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    
    getData();
  }, []);


  const display = posts.filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase());
  });


  let start = (page - 1) * perPage;

  let end = start + perPage;

  let final = display.slice(start, end);

  return (
    <div>
      <h1>Posts App</h1>


      <input
      type='text'
      placeholder='Search Posts...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />


      <select
      value={perPage}
      onChange={(e) => setPerPage(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>

      {final.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App
