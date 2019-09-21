import React, { Component } from 'react';

class Routers extends Component{
  jump = () => {
    console.log(this.props);
  }
  render(){
    return (
      <p onClick={ () => { this.jump() } }>aaa</p>
    )
  }
}
export default Routers