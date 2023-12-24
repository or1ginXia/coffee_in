import React, { Component } from "react";
import './index.css'
import { MinusOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";


export default class PersonCard extends Component{
    state = {isfollow:this.props.isfollow}
    render(){
        const{img_url, name, identity, address} = this.props
        
        return(
            <div id='out-box'>
                <div id='left-box'>
                    <img id='avatar' src={img_url}></img>
                </div>

                <div id='right-box'>
                    <h1 id='identity'>{identity}</h1>
                    <h1 id='name'>{name}</h1>
                    <h1 id='city'>{address}</h1>
                    <button id='sub' onClick={this.subscribe}>{this.state.isfollow ? <MinusOutlined /> : <PlusOutlined />}</button>
                    
                </div>

            </div>
        )
    }

    subscribe = ()=>{
        if (this.state.isfollow == false){
            // implemented!!!
            // change local data
            // send data to the date base
            this.setState({isfollow:true})
        }else{
            this.setState({isfollow:false})
        }

    }
}