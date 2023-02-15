import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Formlist() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchForms() {
      const res = await axios.get('http://localhost:3000/list');
      setForms(res.data);
    }
    fetchForms();
  }, []);

  return (
    <div>
      <h1>Form Data</h1>
      <ul>
        {forms.map(form => (
          <li key={form._id}>
            Name: {form.name}, DOB: {form.dob}, Email: {form.email}, Phone: {form.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Formlist;