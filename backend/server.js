const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
// Enable parsing of JSON data
app.use(bodyParser.json());
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://user123:kedarv.55@cluster0.gz6nqkr.mongodb.net/FormDb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

// Create a model based on the schema
const Form = mongoose.model('Form', formSchema);



// Endpoint to handle form submissions
app.post('/s', (req, res) => {
  try {
    const { name, dob, email, phone } = req.body;
    console.log(req.body)
    // Check if phone number is valid
 
    const phoneRegex = /^[1-9]{1}[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }
  

    // If phone number is valid and age is at least 18, log the form data to the console
    console.log(`Name: ${name}, DOB: ${dob}, Email: ${email}, Phone: ${phone}`);

    const form = new Form({
      name: req.body.name,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone
    });
    
    // Save the form data to the database
    form.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Form submitted successfully' });
      }
    });
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/list', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

'mongodb+srv://user123:<password>@cluster0.gz6nqkr.mongodb.net/?retryWrites=true&w=majority'