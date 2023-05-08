import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';


const ContactList = (props) => {
    const inputEl = useRef('');

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContactHandler}></ContactCard>
        );
    });

    const getSearchTerm = () => {
        // console.log(inputEl.current.value);
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className='ui button blue right' style={{float:'right'}} >Add Contact</button>
                </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input' style={{width:'100%'}}>
                    <input 
                        ref={inputEl}
                        type='text' 
                        placeholder="Search Contacts" 
                        className='prompt' 
                        value = {props.term} 
                        onChange = {getSearchTerm}
                    />
                    <i className='search icon' />
                </div>
            </div>
            <div className='ui celled list'>
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;