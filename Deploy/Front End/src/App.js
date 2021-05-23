import React from 'react';
import Job_Recommendation from './Job_Recommendation';
import Resume_Recommendation from './Resume_Recommendation';
import Main from './Main';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/job-recommendation" component={Job_Recommendation} />
      <Route path="/resume-recommendation" component={Resume_Recommendation} />
    </Router>
  );
}

export default App;
