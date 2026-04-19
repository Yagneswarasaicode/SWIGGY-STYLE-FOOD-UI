import React from "react";

const Contact = () => (
  <div className="contact-page">
    <h1>Get in touch</h1>
    <p className="sub">We'd love to hear from you — partners, feedback, or just a hello.</p>

    <div className="contact-card">
      <div className="contact-icon">📧</div>
      <div className="contact-info">
        <h3>Email Us</h3>
        
      </div>
    </div>

    <div className="contact-card">
      <div className="contact-icon">📞</div>
      <div className="contact-info">
        <h3>Call Support</h3>
        <p>+91 xxxxxxxxxx · Mon–Sat, 9am–9pm</p>
      </div>
    </div>

    <div className="contact-card">
      <div className="contact-icon">📍</div>
      <div className="contact-info">
        <h3>Head Office</h3>
        <p>food street</p>
      </div>
    </div>

    <div className="contact-card">
      <div className="contact-icon">🤝</div>
      <div className="contact-info">
        <h3>Partner With Us</h3>
        
      </div>
    </div>
  </div>
);

export default Contact;
