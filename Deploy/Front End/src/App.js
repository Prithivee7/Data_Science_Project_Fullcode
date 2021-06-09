import React from 'react';
import Job_Recommendation from './Job_Recommendation';
import Resume_Recommendation from './Resume_Recommendation';
import Resume_Form from './Resume_Form';
import Job_Form from './Job_Form';
import Main from './Main';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/job-recommendation" component={Job_Recommendation} />
      <Route path="/resume-recommendation" component={Resume_Recommendation} />
      <Route path="/resume-form" component={Resume_Form} />
      <Route path="/job-form" component={Job_Form} />
    </Router>
  );
}

export default App;
