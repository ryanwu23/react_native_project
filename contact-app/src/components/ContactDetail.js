import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const ContactDetail= () => {
    const location = useLocation();
    const {name, email, image} = location.state.contact;

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={image} alt="user"/>
                    <div className='content'>
                        <div className='header'>{name}</div> 
                        <div className='description'>{email}</div>
                    </div>
                </div>
            </div>
            <div className='center-div' style={{textAlign:'center', margin:'auto'}}>
                <Link to='/'>
                <button className='ui button blue center'>Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetail;