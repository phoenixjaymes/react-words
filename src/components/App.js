import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

// App components
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => (
  <BrowserRouter basename="/lab/r-words">
    <div className="main-body">
      <Header />
      <Main />
      <Footer />
    </div>
  </BrowserRouter>
);


export default App;
