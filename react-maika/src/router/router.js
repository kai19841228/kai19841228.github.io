import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import loadable from 'loadable-components'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

import Index from '../pages/Index';
// import Home from '../pages/Home';
export const Home = loadable(() => import('../pages/Home'))

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route path="/Home" component={Home}/>
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
