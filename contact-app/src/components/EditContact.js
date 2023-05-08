import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';


const EditContact = (props) => {
    const location = useLocation();

    const [id, setId] = useState(location.state.contact.id);
    const [name, setName] = useState(location.state.contact.name);
    const [email, setEmail] = useState(location.state.contact.email);
    const [image, setImage] = useState(location.state.contact.image);

    const update = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            alert('All the fields are mandatory!');
            return
        }

        props.updateContactHandler(id, name, email, image);
        setName('');
        setEmail('');

        props.navigate('/');
    };

    // Adapted from Sam Lama's YouTube tutorial (https://youtu.be/qmr9NCYjueM)
    // This takes an uploaded image for a contact and converts it to Base64
    const uploadImage = async (e) => {
        const file = e.target.files[0];

        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
    
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
    
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        }

        const newImage = await convertBase64(file);
        setImage(newImage)
    }

    return (
        
        <div className='ui main'>
            <h2>Edit Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name='name' placeholder={name} value = {name} onChange={ e => setName(e.target.value)}/>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type='text' name='email' placeholder={email} value = {email} onChange={ e => setEmail(e.target.value)}/>
                </div>

                <div className='field'>
                    <div style={{display:'flex', fontWeight:'bold'}}>
                        <label>Profile Image</label>
                        <input 
                            type='file'
                            onChange = {(e) => {
                                uploadImage(e);
                            }}
                        />
                        <img src = {image} height='200px'/>
                    </div>
                </div>
                <button className = 'ui button blue'>Update</button>
            </form>
        </div>
    );
}

export default EditContact;