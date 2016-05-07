import React from 'react';

class Assets extends React.Component{
  render(){
    return (
      <a-assets>
        {this.props.children}
      </a-assets>
    );
  }
}

export default Assets;
