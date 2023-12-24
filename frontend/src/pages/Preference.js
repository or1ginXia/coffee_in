import React, { Component } from "react";
import BottomMenu from "../Components/BottomMenu";
import Preference_page from "../Components/Preference_page/index"

const default_data =  {bitter:0, acidity:0, body:0, location:'location', beanOrigin:'beanOrigin', beanType:'beanType', roast:'roast', brewing:'brewing' }

// Phone layout
const appStyle = {
    maxWidth: "393px",
    margin: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    height: "852px",
    overflow: "hidden",
    borderRadius: "25px",
};


export default class Preference extends Component{
    back = (e)=>{
        window.history.go(-1);
    }
    render(){
        return(
            <div className="container d-flex flex-column" style={appStyle}>
                <div className="my-3">
                    <button className="btn">
                        <i className="bi bi-arrow-left" onClick={this.back}></i> {/* Left arrow icon */}
                    </button>
                </div>
                <h1 className="text-center my-4">My Preference</h1>
                <Preference_page {...default_data}/>
                <BottomMenu />
            </div>
  
        )
    }
}