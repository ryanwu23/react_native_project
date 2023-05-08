import React, { useEffect, useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/contacts'
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  
  const [contacts, setContacts] =  useState(([]));

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    const  request = {
      id: uuidv4(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const updateContactHandler = async (id, name, email, image) => {
    const updatedContact = {
      id: id,
      name: name,
      email: email,
      image: image
    }
    const response = await api.put(`/contacts/${id}`, updatedContact);
    const allContacts = response.data;
    
    setContacts(
      contacts.map((updatedContact) => {
        return updatedContact.id === id ? { ...allContacts } : updatedContact;
      })
    )
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    
    if (searchTerm !== '') {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(' ').toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      console.log(newContactList)
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };
  
  useEffect (() => {
    const getAllContacts =  async () => {
      const response = await api.get('/contacts');
      const allContacts = response.data;

      if (allContacts) setContacts(allContacts)
    }

    getAllContacts();
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])
  return (
    <div className='ui container'>
        <Header/>
        <Routes>
          <Route path="/" element={<ContactList 
            contacts={searchTerm.length < 1 ? contacts : searchResults}
            getContactId={removeContactHandler}
            term={searchTerm}
            searchKeyword={searchHandler}
          />} />
          <Route path="/add" element={<AddContact addContactHandler = {addContactHandler} navigate = {useNavigate()}/>} />
          <Route path="/contact/:id" element={<ContactDetail/>} />
          <Route 
            path="/edit"
            element={<EditContact updateContactHandler = {updateContactHandler} navigate = {useNavigate()}/>} />
        </Routes>
    </div>
  );
}

export default App;
