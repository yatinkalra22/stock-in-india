import "./App.css";
import history from "./history.js";
import { Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import StockDetail from "./components/StockDetail/StockDetail";

function App() {
  return (
    <div className="App">
      {/* mobile screen view */}
      <div className="main-container">
        <Router history={history}>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/stock/:id" component={StockDetail}></Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
