import React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';
import {browserHistory} from 'react-router';
import AImage from './AImage';
import Sky from './Sky';
import Camera from './Camera';
import Cursor from './Cursor';
import VideoSphere from './VideoSphere';
import Assets from './Assets';
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
<a-videosphere src="#city"></a-videosphere>

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

        <Entity geometry="primitive: sphere" material={{color: 'red'}}
                position="-6 0 -4">
              <Animation begin="click" easing="ease-in" attribute="scale" dur="5000" to="5000 5000 5000"/>
              <Animation begin="mouseenter" fill="forwards" easing="ease-in" attribute="scale" dur="200" to="1.5 1.5 1.5"/>
              <Animation begin="mouseleave" fill="forwards" easing="ease-in" attribute="scale" dur="200" to="1 1 1"/>
        </Entity>


        <Entity key={set.name}
                geometry={{primitive: 'sphere', radius: 0.5}}
                material={{color: set.colour, shader: 'flat'}}
                position={set.position} scale="1 1 -1"
                onClick={this.setupClickCallback(idx)}>
          {animations}
        </Entity>

        <VideoSphere key={set.name}
                     src="#wow"
                     radius="0.5"
                     position={set.position}
                     onClick={this.setupClickCallback(idx)}>
          {animations}
        </VideoSphere>
*/

class MusicSets extends React.Component {

  constructor(props){
    super(props);
    this.timer = null;
    this.state = {
      sets: [{
        name: 'Alesso',
        selected: false,
        colour: 'red',
        position: [-4, 0, -3]
      }, {
        name: 'Tiesto',
        selected: false,
        colour: 'orange',
        position: [-2, 0, -4]
      }, {
        name: 'Afrojack',
        selected: false,
        colour: 'blue',
        position: [2, 0, -4]
      }, {
        name: 'Derp',
        selected: false,
        colour: 'yellow',
        position: [4, 0, -3]
      }],
      setSelectedIndex: null
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

  /**
    #setupClickCallback
  */
  setupClickCallback = (idxClicked) => {
    return () => {
      this.setState({
        setSelectedIndex: idxClicked
      });
      this.timer = setTimeout(()=> {
        this.linkToSets();
      }, 5000);
    }
  }

  linkToSets = () => {
    browserHistory.push('derp');
  }

  render(){

    // Set sky if nothing is selected.
    let sky = (this.state.setSelectedIndex === null) ? <Sky/> : null;
    let instr = (this.state.setSelectedIndex === null) ?
            <AImage src="#instr"
              position={[0, 1, -2]}
              width="1"
              height="1"
              /> : null;
    return (
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

        <Entity>

          {instr}

          {this.state.sets.map((set, idx) => {

            // Something got selected.
            let animations;
            if (this.state.setSelectedIndex !== null){

              // If its the current one.
              if (idx == this.state.setSelectedIndex ){

                // Set clicked animation.
                animations = <Animation easing="ease-in"
                                        attribute="geometry.radius"
                                        dur="10000" to="5000"
                                        />;

              } else { // Not the clicked one.

                // Make it disappear.
                animations = <Animation easing="ease-in" attribute="visible"
                                        dur="3000" to="false"/>;

              }

            } else { // Nothing selected, default animations.
              animations = [
                <Animation key={idx +'_enter'} begin="mouseenter"
                           easing="ease-in" attribute="geometry.radius"
                           dur="200" from="0.5" to="1"
                           />,
                <Animation key={idx +'_leave'} begin="mouseleave"
                           easing="ease-in" attribute="geometry.radius"
                           dur="200" from="1" to="0.5"
                           />
              ];
            }

            return (

              <Entity key={set.name}
                      geometry={{primitive: 'sphere', radius: 0.5}}
                      material={{color: set.colour, shader: 'flat'}}
                      position={set.position} scale="1 1 -1"
                      onClick={this.setupClickCallback(idx)}>
                {animations}
              </Entity>
            )
          })}

          {sky}

        </Entity>

      </Scene>

    );
  }
}

export default MusicSets;
