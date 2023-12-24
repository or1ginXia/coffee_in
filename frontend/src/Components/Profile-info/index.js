import React, { Component } from "react";
import "./index.css";

export default class Person_info extends Component {
  render() {
    const { img_url, name, identity, credit, address } = this.props;
    return (
      <div id="out-box-1">
        <div id="left-box">
          <img id="avatar" src={img_url}></img>
        </div>

        <div id="right-box">
          <h1 id="identity">{identity}</h1>
          <h1 id="name">{name}</h1>
          <h1 id="name">{"Credit: " + credit}</h1>
          <h1 id="city">{address}</h1>
        </div>
      </div>
    );
  }
}
