import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import MusicSets from './components/MusicSets';
import MusicSet from './components/MusicSet';
import Assets from './components/Assets';
/**
  Sky
  <video id="fest" autoPlay loop="true" src="img/derp.mp4"/>

*/

class MainAppScene extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scene>
        <Camera><Cursor/></Camera>

        <Assets>
          <img id="please" src="img/webvr.png"/>
          <img id="start" src="img/start.jpg"/>
          <video id="city" src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"
              autoplay loop/>
        </Assets>

        {this.props.children}

      </Scene>
    );
  }
}


class NoMatch extends React.Component {

}



ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={MainAppScene}>
        <IndexRoute component={MusicSets}/>
        <Route path='music/:setId' component={MusicSet} />
        <Route path='*' component={NoMatch} />
      </Route>
    </Router>
  ),
  document.querySelector('.scene-container'));
