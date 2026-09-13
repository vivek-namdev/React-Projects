import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Dashboard = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="dashboard">
      {isLoggedIn ? (
        <h1>This is your Dashboard</h1>
      ) : (
        <h1>Please login to access your dashboard</h1>
      )}
    </div>
  );
};

export default Dashboard;