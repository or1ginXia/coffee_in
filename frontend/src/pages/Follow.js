import React, { Component } from "react";
import SearchBar from "../Components/SearchBar";
import BottomMenu from "../Components/BottomMenu";
import PersonCard from "../Components/PersonCard/index";
import default_user1 from "../Images/1.jpg";
import default_user2 from "../Images/2.jpeg";
import default_user3 from "../Images/3.png";
import default_user4 from "../Images/4.jpg";
import default_user5 from "../Images/5.jpg";
import { Divider } from 'antd';

// Fake Data
const default_data = [{img_url : default_user1, identity : '00000001', name : 'Oliver', address : 'New York', isfollow : true},
{img_url : default_user2, identity : '00000002', name : 'Ava', address : 'California', isfollow : true},
{img_url : default_user3, identity : '00000003', name : 'Liam', address : 'New York', isfollow : false},
{img_url : default_user4, identity : '00000004', name : 'Emma', address : 'New York', isfollow : false},
{img_url : default_user5, identity : '00000005', name : 'Noah', address : 'New York', isfollow : false}]


// Phone layout
const appStyle = {
    maxWidth: "393px",
    margin: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    height: "852px",
    overflow: "hidden",
    borderRadius: "25px",
};

const mid_style = {
    overflow:"auto",
}

export default class Follow extends Component{
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
                <h1 className="text-center my-4">CAFFEE IN</h1>
                <Divider orientation="center">Subscribe</Divider>
                <SearchBar />
                <div style={mid_style}>
                    {default_data.map(data => (
                        <PersonCard {...data}/>
                    ))}
                </div>
                <BottomMenu />
            </div>
            
        )
    }
}