import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import axios from 'axios';

const Signup = () => {  

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    const value = e.target.value
    const name = e.target.name
    setFormData(purani=>({...purani, [name]:value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    fetch(`${import.meta.env.VITE_API_Base_Url}signup`, {
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      if(data.success==true){
        navigate('/login')
      }
    })
    .catch(error=>console.error('Error:', error))
  }

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>Already Account? <span style={{cursor:"pointer", textDecoration:"underline"}} onClick={()=>navigate('/login')}>Login</span> </p>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    marginTop: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default Signup;
