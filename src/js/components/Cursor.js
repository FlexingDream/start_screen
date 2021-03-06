import {Animation, Entity} from 'aframe-react';
import React from 'react';

export default props => {
  const geometry = {
    primitive: 'ring',
    radiusInner: 0.01,
    radiusOuter: 0.016
  };
  const material = {
    color: props.color,
    shader: 'flat',
    opacity: props.opacity || 0.9,
    transparent: true
  };
  return (
    <Entity cursor={props.cursor} geometry={geometry} material={material} position="0 0 -1">

     <Animation attribute="scale" begin="click" dur="150" fill="backwards"
               to="0 0 0"/>
     <Animation attribute="scale" begin="fusing" easing="ease-in"
       fill="backwards" from="1 1 1" to="0.1 0.1 0.1"
       dur="1500"/>

    </Entity>
  );
}
