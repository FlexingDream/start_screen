import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

import Sky from './components/Sky';
import MusicSets from './components/MusicSets';
import MusicSet from './components/MusicSet';
import Assets from './components/Assets';

import PuaMainScene from './components/Pua/PuaMainScene';
/**
  Sky
  <video id="fest" autoPlay loop="true" src="img/derp.mp4"/>


  <Scene>
    <Camera>
      <Cursor cursor={{fuse: true}} color="black"/>
    </Camera>

    <Assets>
      <img id="please" src="img/webvr.png"/>
      <img id="start" src="img/start.jpg"/>
      <img id="instr" src="img/instr.png"/>
      <video id="city" src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"
          autoplay loop webkit-playsinline/>
      <video id="wow" src="img/gavin-v2-low.mp4"
          autoplay loop webkit-playsinline/>
    </Assets>

    {this.props.children}

  </Scene>
*/

class MainAppScene extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (this.props.children);
  }
}


class NoMatch extends React.Component {
  render(){
    return (<h1>404 Not Found</h1>);
  }
}




ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={MainAppScene}>
        <IndexRoute component={MusicSets}/>
        <Route path='derp' component={PuaMainScene} />
        <Route path='*' component={NoMatch} />
      </Route>
    </Router>
  ),
  document.querySelector('.scene-container'));
