import "./App.css";
import Marks from "./component/Marks";
import Header from "./component/Header";
import Record from "./component/Records";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Marks />
          </Route>
          <Route exact path="/records">
            <Record />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
