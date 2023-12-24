import React, { Component } from "react";
import './index.css'


export default class edit_profile_main extends Component{
    state = {
        avatar:null,
        avatar_preview:this.props.img_url,
        username: this.props.username,
        address: this.props.address,
        password: this.props.password,
        edit_avatar:false,
        edit_username:false,
        edit_password:false,
        edit_address: false,  
    }

    change_avatar =(e)=>{
        console.log(e.target.files);
        this.setState({avatar:e.target.files[0]})
        this.setState({avatar_preview:URL.createObjectURL(e.target.files[0])})
        // this.setState({avatar:URL.createObjectURL(e.target.files[0])})
    }


    change_form_data = (data_type)=>{
        return (e)=>{
            this.setState({
                [data_type]:e.target.value
            })
        }
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        
        
        const data = {
            avatar: this.state.avatar,
            username: this.state.username,
            password: this.state.password,
            address: this.state.address,
            id: this.getSession()
        }
        
        console.log(data)

        const formData = new FormData();
        formData.append('username', data.username)
        formData.append('password', data.password)
        formData.append('address', data.address)
        formData.append('id', data.id)
        if(this.state.avatar != null){
            formData.append('avatar', this.state.avatar)
        }
        
        try {
            const response = await fetch('http://127.0.0.1:5000/change-profile', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Profile update successfully");
                alert("Profile update success")
                // Handle successful post creation
            } else {
                console.error("Failed to change profile");
                // Handle errors
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle network errors
        }
    }

    getSession = () => {
        const sessionData = localStorage.getItem('session');
        
        if (sessionData) {
            const userData = JSON.parse(sessionData);
            return userData;
        }
        
        return null;
    };

    render(){
        return(
            <div id='edit_box'>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div id='edit_box2'>
                        {/* avatar */}
                        <label htmlFor="avatar_1" className='edit_label'>Avatar:</label>
                        <input name='avatar' id='avatar_1' type="file" accept="image/*" onChange={this.change_avatar}/>
                        {/* <img id='edit_avatar' src={this.state.avatar} /> */}
                        <img id='edit_avatar' src={this.state.avatar_preview} />

                        
                        {/* username */}
                        <label htmlFor="username_t" className='edit_label'>Username:</label>
                        <input name='username' className='edit_input' id='username_t' value={this.state.username} onChange={this.change_form_data('username')}/>
                        
                        {/* password */}
                        <label htmlFor="password" className='edit_label'>Password:</label>
                        <input name='password' className='edit_input' id='password' value={this.state.password} onChange={this.change_form_data('password')}/>
                       
                        {/* address */}
                        <label htmlFor="address_t" className='edit_label'>Address:</label>
                        <input name='address' className='edit_input' id='address_t' value={this.state.address} onChange={this.change_form_data('address')}/>

                    </div>
                    
                    <button className='edit_submit' type="submit" >Submit</button>
                </form>

                
            </div>
            
        )
    }    
}
