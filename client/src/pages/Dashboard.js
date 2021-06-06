import React,{useState} from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";

function Dashboard(props) {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  console.log(currentUser);
  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button className="logout-button navigate" onClick={handleLogOut}>
          Log Out
        </Button>
      </header>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
