import React from 'react';

class AddContact extends React.Component {
    state = {
        name:'',
        email:'',
        image:''
    }

    add = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('All the fields are mandatory!');
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name:'',email:''});

        this.props.navigate('/');
    }

    // Adapted from Sam Lama's YouTube tutorial (https://youtu.be/qmr9NCYjueM)
    // This takes an uploaded image for a contact and converts it to Base64
    uploadImage = async (e) => {
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

        this.state.image = await convertBase64(file);
    }

    render() {
        const ifImageExists = () => {
            console.log(this.state.image)
            return this.state.image != '';
        };

        return (
            <div className='ui main'>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.add}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Name' value = {this.state.name} onChange={ (e) => this.setState({name:e.target.value})}/>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='Email' value = {this.state.email} onChange={ (e) => this.setState({email:e.target.value})}/>
                    </div>
                    <div className='field'>
                        <div style={{display:'flex', fontWeight:'bold'}}>
                            <label>Profile Image</label>
                            <input 
                                type='file'
                                onChange = {(e) => {
                                    this.uploadImage(e);
                                }}
                            />
                            {ifImageExists() && <img src = {this.state.image} height='200px'/>}
                        </div>
                    </div>
                    <br />
                    <button className = 'ui button blue'>Add</button>
                </form>
            </div>
        );
    }
}

export default AddContact;