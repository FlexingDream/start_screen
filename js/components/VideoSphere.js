import React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';
import styleParser from 'style-attr';


/**
 * Stringify components passed as an object.
 *
 * {primitive: box; width: 10} to 'primitive: box; width: 10'
 */
function serializeComponents (props) {
  let serialProps = {};
  Object.keys(props).forEach(component => {
    if (['children', 'mixin'].indexOf(component) !== -1) { return; }

    if (props[component].constructor === Function) { return; }

    if (props[component].constructor === Array) {
      //Stringify components passed as array.
      serialProps[component] = props[component].join(' ');
    } else if (props[component].constructor === Object) {
      // Stringify components passed as object.
      serialProps[component] = styleParser.stringify(props[component]);
    } else {
      // Do nothing for components otherwise.
      serialProps[component] = props[component];
    }
  });
  return serialProps;
}

class VideoSphere extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Entity onMouseLeave={this.props.onMouseLeave}
              onMouseEnter={this.props.onMouseEnter}
              onClick={this.props.onClick}>
        <a-videosphere {...serializeComponents(this.props)}>
          {this.props.children}
        </a-videosphere>
      </Entity>
    );
  }
}

export default VideoSphere;
