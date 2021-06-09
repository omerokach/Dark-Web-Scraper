import "../App.css";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPass"
import { DataProvider } from "../context/DataContext";
import Analystic from "./Analystic";
import AlertConfig from "./AlertConfig";

function App() {
  return (
        <Router>
          <AuthProvider>
            <DataProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/analystics" component={Analystic} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/alert-config" component={AlertConfig} />
              </Switch>
            </DataProvider>
          </AuthProvider>
        </Router>
  );
}

export default App;
