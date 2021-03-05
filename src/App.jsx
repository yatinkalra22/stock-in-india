import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../src/components/Home/Home";

function App() {
  return (
    <div className="App">
      {/* mobile screen view */}
      <div className="main-container">
        <Router>
          <Route exact path="/" component={Home}></Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
