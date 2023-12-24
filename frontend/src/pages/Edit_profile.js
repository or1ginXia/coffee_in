import React, { useState, useEffect, Component } from "react";
import BottomMenu from "../Components/BottomMenu";
import Edit_profile_main from "../Components/Edit_profile_main/index"
import default_src from '../Images/default-user2.jpg'

// const default_data_edit_profile = {img_url : default_src, username : 'admin', address : 'New York', password:'123456'}

// Phone layout
const appStyle = {
    maxWidth: "393px",
    margin: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    height: "852px",
    overflow: "hidden",
    borderRadius: "25px",
};


function Edit_Profile(){
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const userid= getSession();
        console.log(userid);
        const fetchUserFile = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/profile/${userid}`);
            if (response.ok) {
              const data = await response.json();
              setUser(data);
              console.log(data)
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

    const back = ()=>{
        window.history.go(-1);
    }

    const handle_data = ()=>{
        return {
            img_url:default_src,
            username: user.username,
            address:'New York',
            password:user.password
        }
    }

    if (user != null){
        return(
            <div className="container d-flex flex-column" style={appStyle}>
                <div className="my-3">
                    <button className="btn">
                        <i className="bi bi-arrow-left" onClick={back}></i> {/* Left arrow icon */}
                    </button>
                </div>
                <Edit_profile_main img_url={user.imgurl} username={user.username} address={user.address} password={user.password}/>
                <BottomMenu />
            </div>
        )
    }
    
}

export default Edit_Profile;


// export default class edit_Profile extends Component{
//     back = (e)=>{
//         window.history.go(-1);
//     }
//     render(){
//         return(
//             <div className="container d-flex flex-column" style={appStyle}>
//                 <div className="my-3">
//                     <button className="btn">
//                         <i className="bi bi-arrow-left" onClick={this.back}></i> {/* Left arrow icon */}
//                     </button>
//                 </div>
//                 <h1 className="text-center my-4">Edit Profile</h1>
//                 <Edit_profile_main {...default_data_edit_profile}/>
//                 <BottomMenu />
//             </div>
            
//         )
//     }

// }