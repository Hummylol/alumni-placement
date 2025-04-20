'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './contact.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container p-4 bg-gray-100 min-h-screen">
      <Head>
        <title>Contact Us - Jerusalem College of Engineering</title>
        <meta name="description" content="Contact Jerusalem College of Engineering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="nav mb-8">
        <Link href="/">
          <img src="/jce-logo.png" alt="JCE Logo" className="logo" />
        </Link>
      </header>

      <div className="contact-page">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Contact Us</h1>

        <div className="contact-grid">
          <div className="contact-section">
            <h2 className="contact-heading">College Address</h2>
            <div className="contact-content">
              <p className="font-bold">JERUSALEM COLLEGE OF ENGINEERING</p>
              <p>Velachery main road,</p>
              <p>Narayanapuram,Pallikaranai,</p>
              <p>Chennai, Tamil Nadu</p>
              <div className="contact-details">
                <p>+91 44 66199500</p>
                <p>+91 44 66199558</p>
                <a href="mailto:jerusalemengg@gmail.com" className="text-blue-600 hover:underline">
                  jerusalemengg@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-heading">Administrative Office</h2>
            <div className="contact-content">
              <p className="font-bold">JERUSALEM COLLEGE OF ENGINEERING</p>
              <p>No.25, Mahalingam street,</p>
              <p>Mahalingapuram Nungambakkam,</p>
              <p>Chennai, Tamil Nadu</p>
              <div className="contact-details">
                <p>+91 44 66199521</p>
                <p>+91 44 66199546</p>
                <a href="mailto:jerusalemengg@gmail.com" className="text-blue-600 hover:underline">
                  jerusalemengg@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-heading">Admission Contacts</h2>
            <div className="contact-content">
              <div className="contact-details">
                <p>+91 75400 37999</p>
                <p>+91 9176633347</p>
                <p>044 66199500</p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-heading">Hostel Contacts</h2>
            <div className="contact-content">
              <div className="contact-details">
                <p>+91 44 66199598</p>
                <p>+91 44 66199591</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2 className="text-2xl font-bold mb-4">Leave us your info</h2>
          <p className="text-gray-600 mb-6">and we will get back to you.</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name (required)</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email (required)</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows={5}
              />
            </div>

            <button type="submit" className="submit-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 