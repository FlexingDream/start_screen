import React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';
import {browserHistory} from 'react-router';
import AImage from './AImage';
/**
<Entity>
  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
  <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>
  <Entity geometry="primitive: box" material={{color: this.state.color}}
          onMouseEnter={this.changeToHover}
          onMouseLeave={this.changeToOriginalColour}
          position="0 0 -5">
    <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>
  </Entity>
</Entity>
*/

class MusicSets extends React.Component {

  constructor(props){
    super(props);
    this.timer = null;
    this.state = {
      color: 'red',
      hovering: false
    };
  }

  changeToOriginalColour = () => {
    this.setState({
      color: 'red',
      hovering: false
    });

    if (this.timer !== null){
      clearTimeout(this.timer);
    }

  }

  changeToHover = () => {
    console.log('HOVERING')
    this.setState({
      color: 'orange',
      hovering: true
    });
  }

  linkToSets = () => {
    browserHistory.push('music/kpop');
  }

  render(){
    let animation = <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>;
    if (this.state.hovering === false){
      animation = null;
    }
    return (
      <Entity>

        <Entity look-at="#camera">
          <Entity geometry="primitive: box" material={{color: this.state.color}}
                  onMouseEnter={this.changeToHover}
                  onMouseLeave={this.changeToOriginalColour}
                  position="0 0 -2">
                  { animation }
          </Entity>

          <AImage src="#please"
                  position={[0, 0, -1]}
                  width="1"
                  height="0.25"
                  opacity="0.75"
                  onMouseEnter={this.changeToHover}
                  onMouseLeave={this.changeToOriginalColour}
                  />
        </Entity>
        <a-videosphere src="#city"></a-videosphere>
      </Entity>
    );
  }
}

export default MusicSets;
