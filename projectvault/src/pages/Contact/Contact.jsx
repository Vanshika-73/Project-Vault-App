import './Contact.css';
import React, { useState } from 'react';
import { sendContactMessage } from '../../Service/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } catch (error) {
      alert("An error occured");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
    } catch (error) {
      alert("An error occured");
    }
    setFormData({ name: '', email: '', message: '' });
    alert('Your message has been sent successfully!');
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have a question or need assistance? Send us a message using the form below.</p>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            className='input-fields'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            className='input-fields'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea
            className='input-fields'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            required
          />
        </div>
        <button className='contact-button' type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
