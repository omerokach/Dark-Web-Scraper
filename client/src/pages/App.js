import "../App.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPass"
function App() {
  return (
        <Router>
          <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
              </Switch>
          </AuthProvider>
        </Router>
  );
}

export default App;
