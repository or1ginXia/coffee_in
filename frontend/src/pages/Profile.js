import React, { useState, useEffect, Component } from "react";
import BottomMenu from "../Components/BottomMenu";
import Profile_info from "../Components/Profile-info/index";
import default_user from '../Images/default-user2.jpg';
import Profile_mid_info from "../Components/Profile-mid-info/index";
import { Divider } from "antd";
import CoffeeList from "../Components/CoffeeList";
import {
  LogoutOutlined
} from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";

// fake data
const default_data_profile_info = {
  imgurl: default_user,
  identity: "00000000",
  name: "admin",
  credit: "341",
  address: "New York",
};

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
  overflowY: "auto",
  height: "1000px",
  overflowX: "hidden",
};

const logout = {
  float:'right',
  margin:"10px"
};



function Profile(){
  const navigate = useNavigate();
  const [user, setUser] = useState(default_data_profile_info);

  useEffect(() => {
    const userid= getSession();
    console.log(userid);
    const fetchUserFile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/profile/${userid}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching personal profile:", error);
      }
    };

    fetchUserFile();
  }, []);

  const getSession = () => {
    const sessionData = localStorage.getItem('session');
  
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData;
    }
  
    return null;
  };

  const log_out=(e)=>{
    localStorage.removeItem('session')
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="container d-flex flex-column" style={appStyle}>
      <div >
        <LogoutOutlined style={logout} onClick={log_out}/>
      </div>
      
      <h1 className="text-center my-4">CAFFEE IN</h1>
      <Divider orientation="center">My Profile</Divider>
      <Profile_info  img_url={user.imgurl} identity={user.id} name={user.username} credit = {user.credit} address={user.address}/>
      <Profile_mid_info />
      <Divider orientation="left">My Post</Divider>
      <div style={post_part}>
        <CoffeeList postType="profile"/>
      </div>
      <BottomMenu />
    </div>
  );
}

export default Profile;

// export default class Profile extends Component {
//   render() {
//     return (
//       <div className="container d-flex flex-column" style={appStyle}>
//         <h1 className="text-center my-4">CAFFEE IN</h1>
//         <Divider orientation="center">My Profile</Divider>
//         <Profile_info {...default_data_profile_info} />
//         <Profile_mid_info />
//         <Divider orientation="left">My Post</Divider>
//         <div style={post_part}>
//           <CoffeeList />
//         </div>
//         <BottomMenu />
//       </div>
//     );
//   }
// }
