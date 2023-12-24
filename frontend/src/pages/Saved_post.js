import React, { Component } from "react";
import BottomMenu from "../Components/BottomMenu";
import { Divider } from 'antd';
import CoffeeList from "../Components/CoffeeList";

// Phone layout
const appStyle = {
    maxWidth: "393px",
    margin: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    height: "852px",
    overflow: "hidden",
    borderRadius: "25px",
};

const post_part = {
    overflowY:'auto',
    height:'1000px',
    overflowX:'hidden'
}


export default class saved_post extends Component{
    render(){
        return(
            <div className="container d-flex flex-column" style={appStyle}>
                <h1 className="text-center my-4">Saved Post</h1>
                <Divider orientation="center">Saved Post</Divider>
                <div style={post_part}>
                    <CoffeeList postType="saved" />
                </div>
                <BottomMenu />
            </div>
            
        )
    }
}