import React, { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const data = [
    { id: 1, name: "Aarav", age: 22 },
    { id: 2, name: "Vivaan", age: 24 },
    { id: 3, name: "Aditya", age: 21 },
    { id: 4, name: "Arjun", age: 25 },
    { id: 5, name: "Rohan", age: 23 },
    { id: 6, name: "Kabir", age: 26 },
    { id: 7, name: "Rahul", age: 20 },
    { id: 8, name: "Karan", age: 27 },
    { id: 9, name: "Ankit", age: 22 },
    { id: 10, name: "Mohit", age: 24 },
    { id: 11, name: "Nikhil", age: 21 },
    { id: 12, name: "Aman", age: 28 },
    { id: 13, name: "Ravi", age: 23 },
    { id: 14, name: "Sahil", age: 25 },
    { id: 15, name: "Yash", age: 22 },
    { id: 16, name: "Harsh", age: 26 },
    { id: 17, name: "Dev", age: 20 },
    { id: 18, name: "Varun", age: 29 },
    { id: 19, name: "Akash", age: 24 },
    { id: 20, name: "Manish", age: 27 },
    { id: 21, name: "Deepak", age: 23 },
    { id: 22, name: "Sumit", age: 21 },
    { id: 23, name: "Raj", age: 25 },
    { id: 24, name: "Vikram", age: 30 },
    { id: 25, name: "Abhishek", age: 22 },
    { id: 26, name: "Varun", age: 26 },
    { id: 27, name: "Rishabh", age: 24 },
    { id: 28, name: "Shubham", age: 28 },
    { id: 29, name: "Prakash", age: 23 },
    { id: 30, name: "Kunal", age: 27 },
  ];

  const totalPages = Math.ceil(data.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default App;
