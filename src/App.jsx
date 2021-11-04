import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/Home';
import DetailsPage from './routes/DetailsPage';
import UpdatePage from './routes/UpdatePage';
import './index.css'


const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants/:id/update" component={UpdatePage} />
          <Route exact path="/restaurants/:id" component={DetailsPage} />
        </Switch>
      </Router>
    </div>
  )
} 

export default App