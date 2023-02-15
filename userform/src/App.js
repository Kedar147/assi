import Form from "./Form";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Formlist from "./Formlist";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/list" component={Formlist} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
