import React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';
import {browserHistory} from 'react-router';

class MusicSet extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
        <Entity>
          <Entity light={{type: 'ambient', color: '#888'}}/>
          <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
          <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>
          <Entity geometry="primitive: sphere" material={{color: 'red'}}
                  position="0 0 -5">
            <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>
          </Entity>
        </Entity>
    );
  }
}

export default MusicSet;
