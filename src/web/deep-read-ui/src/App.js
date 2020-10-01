import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// styles
import './style.scss';

// components
import Home from './pages/Home';
import Header from './components/Header';
import SidebarNav from './components/SidebarNav';
import Search from './pages/Search';
import Summary from './pages/Summary';
import VideoLinkUpload from './pages/VideoLinkUpload';
import MCQ from './pages/MCQ';

const App = () => {
  let [menuState, setMenuState] = useState(false);
  return (
    <BrowserRouter>
      <div className="App container">
        <Header menuState={menuState} setMenuState={setMenuState} />
        <SidebarNav menuState={menuState} setMenuState={setMenuState} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/videolinkupload" exact component={VideoLinkUpload} />
          <Route path="/summary" exact component={Summary} />
          <Route path="/mcq" exact component={MCQ} />
          <Route path="/search" exact component={Search} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
