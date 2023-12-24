import React, { Component } from "react";
import "./index.css";
import {
  InfoCircleOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";

const Person_mid_info = () => {
  const navigate = useNavigate();

  const info_btn = (e) => {
    // add router
    e.preventDefault();
    navigate("/edit_profile");
  };

  const per_btn = (e) => {
    // add router
    e.preventDefault();
    navigate("/preference");
  };

  const like_btn = (e) => {
    //add router
    e.preventDefault();
    navigate("/follow");
  };

  return (
    <div id="box3">
      <div className="ver_box">
        <InfoCircleOutlined onClick={info_btn} className="icon" />
      </div>
      <div className="ver_box">
        <UnorderedListOutlined onClick={per_btn} className="icon" />
      </div>
      <div className="ver_box">
        <UserAddOutlined onClick={like_btn} className="icon" />
      </div>
    </div>
  );
};

export default Person_mid_info;
// export default class Person_mid_info extends Component{
//     render(){
//         return(
//             <div id = 'box3'>
//                 <div className='ver_box'>
//                     <InfoCircleOutlined onClick={this.info_btn} className="icon"/>
//                 </div>
//                 <div className='ver_box'>
//                     <UnorderedListOutlined onClick={this.per_btn} className="icon"/>
//                 </div>
//                 <div className='ver_box'>
//                     <StarOutlined onClick={this.like_btn} className="icon"/>
//                 </div>
//             </div>
//         )
//     }

//     info_btn = (e)=>{
//         // add router
//         e.preventDefault();
//         useNavigate()('/edit_profile');
//     }

//     per_btn = (e)=>{
//         // add router
//         e.preventDefault();
//         useNavigate()('/preference');
//     }

//     like_btn = (e)=>{
//         //add router
//         e.preventDefault();
//         useNavigate()('/saved_post');
//     }
// }
