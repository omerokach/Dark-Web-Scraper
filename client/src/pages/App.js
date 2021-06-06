import "../App.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;