import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity>
    <Entity id="camera" camera="" look-controls="" wasd-controls="" {...props}/>
  </Entity>
);
