import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// Main components
import Home from './Home';
import WordContainer from './WordContainer';
import {
  MeatWords,
  DoctorWords,
  GermanWords,
} from '../data/words';
import NotFound from './NotFound';

const Main = () => (
  <main className="main-content">
    <section className="main-content__wrap">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/meat" render={() => <WordContainer data={MeatWords} />} />
        <Route path="/doctor" render={() => <WordContainer data={DoctorWords} />} />
        <Route path="/german" render={() => <WordContainer data={GermanWords} />} />
        <Route component={NotFound} />
      </Switch>
    </section>
  </main>
);

export default Main;
