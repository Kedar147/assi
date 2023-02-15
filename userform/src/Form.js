import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function Form() {
  const history = useHistory();
  let [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let today = new Date();
    let birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      alert('You must be at least 18 years old to submit this form.');
      return;
    }
    console.log(`Name: ${formData.name}, DOB: ${formData.dob}, Email: ${formData.email}, Phone: ${formData.phone}`);
    console.log(formData);

    axios.post('/s', {
        name:formData.name,
        dob:formData.dob,
        email:formData.email,
        phone:formData.phone,

        
      })
      .then(response => {
       console.log(response)
        if (response.status==200) {
          // Form submitted successfully
          console.log('Form submitted successfully');
          history.push('/list');
        } else {
          // Form submission failed
          console.error(response);
        }
      })
      .catch(error => {
        console.error('An error occurred while submitting the form', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;

