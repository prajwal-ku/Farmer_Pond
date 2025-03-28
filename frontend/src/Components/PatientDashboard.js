import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, Button, ProgressBar } from "react-bootstrap";

const PatientDashboard = () => {
  const [profileCompletion, setProfileCompletion] = useState(0); // Start at 0% when empty
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({
    // Personal Section
    name: "",
    contactNumber: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    maritalStatus: "",
    height: "",
    weight: "",
    emergencyContact: "",
    location: "",
    
    // Medical Section
    allergies: "",
    currentMedications: "",
    pastMedications: "",
    chronicDiseases: "",
    injuries: "",
    surgeries: "",
    
    // Lifestyle Section
    smokingHabits: "",
    alcoholConsumption: "",
    activityLevel: "",
    foodPreference: "",
    occupation: ""
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("patientProfile"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  useEffect(() => {
    const filledFields = Object.values(formData).filter((val) => val !== "").length;
    const totalFields = Object.keys(formData).length;
    setProfileCompletion(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("patientProfile", JSON.stringify(formData));
    alert("Profile Saved!");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <h2>Personal</h2>
            
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter contact number" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                <option value="">Select marital status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control type="text" name="height" value={formData.height} onChange={handleChange} placeholder="Enter height" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="Enter weight" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Enter emergency contact" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" />
            </Form.Group>
            
            <Button variant="primary" type="submit">Save Personal Details</Button>
          </Form>
        );
      case "medical":
        return (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <h2>Medical</h2>
            
            <Form.Group className="mb-3">
              <Form.Label>Allergies</Form.Label>
              <Form.Control type="text" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Enter allergies" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Current Medications</Form.Label>
              <Form.Control type="text" name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="Enter current medications" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Past Medications</Form.Label>
              <Form.Control type="text" name="pastMedications" value={formData.pastMedications} onChange={handleChange} placeholder="Enter past medications" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Chronic Diseases</Form.Label>
              <Form.Control type="text" name="chronicDiseases" value={formData.chronicDiseases} onChange={handleChange} placeholder="Enter chronic diseases" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Injuries</Form.Label>
              <Form.Control type="text" name="injuries" value={formData.injuries} onChange={handleChange} placeholder="Enter injuries" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Surgeries</Form.Label>
              <Form.Control type="text" name="surgeries" value={formData.surgeries} onChange={handleChange} placeholder="Enter surgeries" />
            </Form.Group>
            
            <Button variant="primary" type="submit">Save Medical Details</Button>
          </Form>
        );
      case "lifestyle":
        return (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <h2>Lifestyle</h2>
            
            <Form.Group className="mb-3">
              <Form.Label>Smoking Habits</Form.Label>
              <Form.Select name="smokingHabits" value={formData.smokingHabits} onChange={handleChange}>
                <option value="">Select smoking habits</option>
                <option value="Never">Never</option>
                <option value="Former">Former</option>
                <option value="Occasional">Occasional</option>
                <option value="Regular">Regular</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Alcohol Consumption</Form.Label>
              <Form.Select name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange}>
                <option value="">Select alcohol consumption</option>
                <option value="Never">Never</option>
                <option value="Former">Former</option>
                <option value="Occasional">Occasional</option>
                <option value="Regular">Regular</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Activity Level</Form.Label>
              <Form.Select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                <option value="">Select activity level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Light">Light</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
                <option value="Very Active">Very Active</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Food Preference</Form.Label>
              <Form.Select name="foodPreference" value={formData.foodPreference} onChange={handleChange}>
                <option value="">Select food preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Pescatarian">Pescatarian</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Enter occupation" />
            </Form.Group>
            
            <Button variant="primary" type="submit">Save Lifestyle Details</Button>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Patient Dashboard</Navbar.Brand>
          <Nav>
            <NavDropdown 
              title={
                <>
                  <span className="profile-progress">{profileCompletion}%</span> Profile
                </>
              } 
              id="profile-dropdown"
            >
              <div className="px-3 py-2">
                <ProgressBar now={profileCompletion} label={`${profileCompletion}%`} />
              </div>
              <NavDropdown.Item onClick={() => setActiveSection("personal")}>Personal</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection("medical")}>Medical</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection("lifestyle")}>Lifestyle</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSubmit}>Save Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        {renderSection()}
        <div className="text-center mt-4">
          <p>Complete profile {profileCompletion}% completed</p>
        </div>
      </Container>
    </>
  );
};

export default PatientDashboard;