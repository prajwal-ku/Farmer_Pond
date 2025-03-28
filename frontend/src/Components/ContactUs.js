import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setError(data.message || "❌ Failed to send message");
      }
    } catch (err) {
      setError("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "50px", paddingBottom: "10px" }}>
      <h2 className="text-center mb-5">Contact Us</h2>

      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {sent ? "✅ Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
