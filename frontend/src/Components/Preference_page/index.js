import React, { Component, useState } from "react";
import './index.css'

export default class edit_profile_main extends Component{
    
    
    state = {
        location: this.props.location,
        beanOrigin: this.props.beanOrigin,
        beanType: this.props.beanType,
        roast: this.props.roast,
        brewing: this.props.brewing,
        bitter: this.props.bitter,
        acidity: this.props.acidity,
        body: this.props.body,
        edit_location:false,
        edit_beanOrigin: false,
        edit_beanType: false,
        edit_roast: false,
        edit_brewing: false,
        edit_bitter: false,
        edit_acidity:  false,
        edit_body: false
    }


    change_form_data = (data_type)=>{
        return (e)=>{
            this.setState({
                [data_type]:e.target.value
            })
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            location: this.state.location,
            beanOrigin: this.state.beanOrigin,
            beanType:  this.state.beanType,
            roast: this.state.roast,
            brewing: this.state.brewing,
            bitter: this.state.bitter,
            acidity:  this.state.acidity,
            body: this.state.body
        }
        console.log(data)
    }

    render(){
        return(
            <div id='edit_box_p'>
                <form onSubmit={this.handleSubmit}>
                    <div id='edit_box2_p'>

                        {/* bitterness */}
                        <label htmlFor='bitter_p' className="form-label">Bitterness: {this.state.bitter}</label>
                        <input type="range" className="form-range" id='bitter_p' min={0} max={10} step={1} value={this.state.bitter} onChange={this.change_form_data('bitter')}/>

                        {/* acidity */}
                        <label htmlFor='acidity_p' className="form-label">Acidity: {this.state.acidity}</label>
                        <input type="range" className="form-range" id='acidity_p' min={0} max={10} step={1} value={this.state.acidity} onChange={this.change_form_data('acidity')}/>
                            
                        {/* body */}
                        <label htmlFor='body_p' className="form-label">Body: {this.state.body}</label>
                        <input type="range" className="form-range" id='body_p' min={0} max={10} step={1} value={this.state.body} onChange={this.change_form_data('body')}/>
                        
                        {/* location */}
                        <label htmlFor="location_t" className='edit_label_p'>Location:</label>
                        <input name='location' className='edit_input_p' id='location_t' value = {this.state.location} onChange={this.change_form_data('location')}/>

                        {/* Bean Origin */}
                        <label htmlFor="Bean_Origin_t" className='edit_label_p'>Bean Origin:</label>
                        <input name='beanOrigin' className='edit_input_p' id='Bean_Origin_t' value = {this.state.beanOrigin} onChange={this.change_form_data('beanOrigin')}/>

                        {/* Bean Type */}
                        <label htmlFor="Bean_Type_t" className='edit_label_p'>Bean Type:</label>
                        <input name='beanType' className='edit_input_p' id='Bean_Type_t' value = {this.state.beanType} onChange={this.change_form_data('beanType')}/>

                        {/* Roast */}
                        <label htmlFor="Roast_t" className='edit_label_p'>Roast:</label>
                        <input name='roast' className='edit_input_p' id='Roast_t'  value = {this.state.roast} onChange={this.change_form_data('roast')}/>

                        {/* brewing */}
                        <label htmlFor="brewing_t" className='edit_label_p'>Brewing:</label>
                        <input name='brewing' className='edit_input_p' id='brewing_t' value = {this.state.brewing} onChange={this.change_form_data('brewing')}/>
                              
                    </div>
                    
                    <button className='edit_submit_p' type="submit" >Submit</button>
                </form>

                
            </div>
            
        )
    }    
}