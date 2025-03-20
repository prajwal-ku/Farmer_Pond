import React from "react";

function ContactUs() {
  return (
    <div className="container mt-5" style={{ paddingTop: "50px", paddingBottom: "10px" }}>  
      <h2 className="text-center mb-5">Contact Us</h2>

      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Write your message" required></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
