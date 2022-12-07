import './App.css';
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Navbar from "./component/NavigationBar";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar />
        <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/edit/:id" component={Edit} exact/>
            <Route path="/login" component={Login} exact />
          </Switch>
        </main>
        </BrowserRouter>
      <div className="center">
      </div>
    </div>
  );
}

export default App;
