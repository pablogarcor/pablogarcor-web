import React, { Component } from "react";
import "./About.css";
import pablo from "../../../content/images/pablo.jpg"

class About extends Component {
  render() {
    return (
      <div className="wrapper">

        <img className="profile" src={pablo} style={{borderRadius:"50%", width:"200px"}} />

        <svg height="320" width="400" className="logo-triangle">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:"rgb(50,50,50)",stopOpacity:"1"}}/>
              <stop offset="100%" style={{stopColor: "black", stopOpacity: "1"}}/>
            </linearGradient>
          </defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <polygon points="0,0 400,0 200,300" stroke="#36e2f8" strokeWidth="3"/>
        </svg>
        <div className="grid"></div>
      </div>
    );
  }
}

export default About;
