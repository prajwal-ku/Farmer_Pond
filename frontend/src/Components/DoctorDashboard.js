import React, { useState, useEffect } from "react";
import { 
  Container, Form, Button, Card, Row, Col, 
  Tab, Tabs, Alert, Modal, ProgressBar, Badge,
  ListGroup
} from "react-bootstrap";
import { 
  FaUserMd, FaCalendarAlt, FaFileMedical, FaClinicMedical,
  FaUniversity, FaAward, FaLanguage, FaGlobe, FaPhone, 
  FaEnvelope, FaFileInvoiceDollar, FaCheckCircle, FaPlus, FaTimes
} from "react-icons/fa";

const DoctorDashboard = () => {
  // Doctor Profile State
  const [doctorProfile, setDoctorProfile] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      profilePhoto: null,
      bio: ""
    },
    professionalInfo: {
      specialty: "",
      specialties: [],
      qualifications: [],
      experience: "",
      licenseNumber: "",
      practicingSince: "",
      consultationFee: "",
      servicesOffered: [],
      languagesSpoken: []
    },
    clinicInfo: {
      clinicName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      clinicPhotos: [],
      facilities: []
    },
    education: [],
    awards: [],
    membership: []
  });

  // Subscription and Payment State
  const [subscription, setSubscription] = useState({
    plan: "",
    paymentStatus: "unpaid",
    verificationStatus: "pending"
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newItem, setNewItem] = useState({});
  const [tempItem, setTempItem] = useState("");

  // Subscription Plans
  const subscriptionPlans = [
    { id: "basic", name: "Basic Plan", price: 999, features: ["Profile listing", "10 appointments/month"] },
    { id: "premium", name: "Premium Plan", price: 1999, features: ["Profile listing", "Unlimited appointments", "Featured listing"] },
    { id: "gold", name: "Gold Plan", price: 2999, features: ["Profile listing", "Unlimited appointments", "Top placement", "Video consultation"] }
  ];

  // Tab State
  const [activeTab, setActiveTab] = useState("basic");

  // Profile Handlers
  const handleChange = (e, section, field) => {
    const { value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setDoctorProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: checked 
            ? [...prev[section][field], value]
            : prev[section][field].filter(item => item !== value)
        }
      }));
    } else if (type === "file") {
      setDoctorProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: files[0] || files
        }
      }));
    } else {
      setDoctorProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleAddItem = (section, field, value) => {
    if (!value) return;
    setDoctorProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], value.trim()]
      }
    }));
    setTempItem("");
  };

  const handleAddComplexItem = (section, item) => {
    if (!item || Object.values(item).some(val => !val)) return;
    setDoctorProfile(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
    setNewItem({});
  };

  const handleRemoveItem = (section, field, index) => {
    if (field) {
      setDoctorProfile(prev => {
        const updatedArray = [...prev[section][field]];
        updatedArray.splice(index, 1);
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: updatedArray
          }
        };
      });
    } else {
      setDoctorProfile(prev => {
        const updatedArray = [...prev[section]];
        updatedArray.splice(index, 1);
        return {
          ...prev,
          [section]: updatedArray
        };
      });
    }
  };

  // Payment Handlers
  const handlePlanSelect = (planId) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    setSelectedPlan(plan);
    setSubscription(prev => ({ ...prev, plan: planId }));
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    const updatedSubscription = {
      ...subscription,
      paymentStatus: "paid",
      verificationStatus: "pending",
      paymentDate: new Date().toISOString()
    };
    setSubscription(updatedSubscription);
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    
    // Save to local storage
    const updatedProfile = {
      ...doctorProfile,
      subscription: updatedSubscription
    };
    localStorage.setItem("doctorProfile", JSON.stringify(updatedProfile));
  };

  // Load saved data
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("doctorProfile"));
    if (savedProfile) {
      setDoctorProfile(prev => ({
        ...prev,
        ...savedProfile,
        // Ensure arrays exist even if not in saved data
        professionalInfo: {
          ...prev.professionalInfo,
          ...savedProfile.professionalInfo,
          specialties: savedProfile.professionalInfo?.specialties || [],
          qualifications: savedProfile.professionalInfo?.qualifications || [],
          servicesOffered: savedProfile.professionalInfo?.servicesOffered || [],
          languagesSpoken: savedProfile.professionalInfo?.languagesSpoken || []
        },
        clinicInfo: {
          ...prev.clinicInfo,
          ...savedProfile.clinicInfo,
          facilities: savedProfile.clinicInfo?.facilities || []
        },
        education: savedProfile.education || [],
        awards: savedProfile.awards || [],
        membership: savedProfile.membership || []
      }));
      
      if (savedProfile.subscription) {
        setSubscription(savedProfile.subscription);
      }
    }
  }, []);

  // Save Profile
  const handleSaveProfile = () => {
    const profileToSave = {
      ...doctorProfile,
      subscription
    };
    localStorage.setItem("doctorProfile", JSON.stringify(profileToSave));
    alert("Profile saved successfully!");
  };

  // Render Profile Sections
  const renderBasicInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaUserMd className="me-2" />Basic Information</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.basicInfo.firstName}
                onChange={(e) => handleChange(e, "basicInfo", "firstName")}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.basicInfo.lastName}
                onChange={(e) => handleChange(e, "basicInfo", "lastName")}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender*</Form.Label>
              <Form.Select 
                value={doctorProfile.basicInfo.gender}
                onChange={(e) => handleChange(e, "basicInfo", "gender")}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
                type="date" 
                value={doctorProfile.basicInfo.dateOfBirth}
                onChange={(e) => handleChange(e, "basicInfo", "dateOfBirth")}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><FaPhone className="me-2" />Phone*</Form.Label>
              <Form.Control 
                type="tel" 
                value={doctorProfile.basicInfo.phone}
                onChange={(e) => handleChange(e, "basicInfo", "phone")}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><FaEnvelope className="me-2" />Email*</Form.Label>
              <Form.Control 
                type="email" 
                value={doctorProfile.basicInfo.email}
                onChange={(e) => handleChange(e, "basicInfo", "email")}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*"
            onChange={(e) => handleChange(e, "basicInfo", "profilePhoto")}
          />
          {doctorProfile.basicInfo.profilePhoto && (
            <div className="mt-2">
              <small>Selected: {doctorProfile.basicInfo.profilePhoto.name}</small>
            </div>
          )}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            value={doctorProfile.basicInfo.bio}
            onChange={(e) => handleChange(e, "basicInfo", "bio")}
            placeholder="Tell patients about yourself and your medical philosophy"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );

  const renderProfessionalInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaUserMd className="me-2" />Professional Information</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Primary Specialty*</Form.Label>
              <Form.Select 
                value={doctorProfile.professionalInfo.specialty}
                onChange={(e) => handleChange(e, "professionalInfo", "specialty")}
                required
              >
                <option value="">Select Specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Practice">General Practice</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Years of Experience*</Form.Label>
              <Form.Control 
                type="number" 
                value={doctorProfile.professionalInfo.experience}
                onChange={(e) => handleChange(e, "professionalInfo", "experience")}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Additional Specialties</Form.Label>
          <div className="mb-2">
            {doctorProfile.professionalInfo.specialties.map((spec, index) => (
              <Badge pill bg="info" className="me-2 mb-2" key={index}>
                {spec}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-white p-0 ms-1"
                  onClick={() => handleRemoveItem("professionalInfo", "specialties", index)}
                >
                  <FaTimes />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Add specialty"
              value={tempItem}
              onChange={(e) => setTempItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem("professionalInfo", "specialties", tempItem)}
            />
            <Button 
              variant="primary" 
              className="ms-2"
              onClick={() => handleAddItem("professionalInfo", "specialties", tempItem)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Medical Qualifications*</Form.Label>
          <div className="mb-2">
            {doctorProfile.professionalInfo.qualifications.length > 0 ? (
              <ListGroup>
                {doctorProfile.professionalInfo.qualifications.map((qual, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {qual}
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-danger p-0"
                      onClick={() => handleRemoveItem("professionalInfo", "qualifications", index)}
                    >
                      <FaTimes />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert variant="warning">Please add at least one qualification</Alert>
            )}
          </div>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Add qualification (e.g., MBBS, MD)"
              value={tempItem}
              onChange={(e) => setTempItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem("professionalInfo", "qualifications", tempItem)}
            />
            <Button 
              variant="primary" 
              className="ms-2"
              onClick={() => handleAddItem("professionalInfo", "qualifications", tempItem)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Medical License Number*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.professionalInfo.licenseNumber}
                onChange={(e) => handleChange(e, "professionalInfo", "licenseNumber")}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Practicing Since*</Form.Label>
              <Form.Control 
                type="date" 
                value={doctorProfile.professionalInfo.practicingSince}
                onChange={(e) => handleChange(e, "professionalInfo", "practicingSince")}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Consultation Fee (₹)*</Form.Label>
          <Form.Control 
            type="number" 
            value={doctorProfile.professionalInfo.consultationFee}
            onChange={(e) => handleChange(e, "professionalInfo", "consultationFee")}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Services Offered</Form.Label>
          <div className="mb-2">
            {doctorProfile.professionalInfo.servicesOffered.map((service, index) => (
              <Badge pill bg="secondary" className="me-2 mb-2" key={index}>
                {service}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-white p-0 ms-1"
                  onClick={() => handleRemoveItem("professionalInfo", "servicesOffered", index)}
                >
                  <FaTimes />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Add service (e.g., ECG, Vaccination)"
              value={tempItem}
              onChange={(e) => setTempItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem("professionalInfo", "servicesOffered", tempItem)}
            />
            <Button 
              variant="primary" 
              className="ms-2"
              onClick={() => handleAddItem("professionalInfo", "servicesOffered", tempItem)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Languages Spoken*</Form.Label>
          <div className="mb-2">
            {doctorProfile.professionalInfo.languagesSpoken.length > 0 ? (
              doctorProfile.professionalInfo.languagesSpoken.map((lang, index) => (
                <Badge pill bg="success" className="me-2 mb-2" key={index}>
                  {lang}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => handleRemoveItem("professionalInfo", "languagesSpoken", index)}
                  >
                    <FaTimes />
                  </Button>
                </Badge>
              ))
            ) : (
              <Alert variant="warning">Please add at least one language</Alert>
            )}
          </div>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Add language (e.g., English, Hindi)"
              value={tempItem}
              onChange={(e) => setTempItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem("professionalInfo", "languagesSpoken", tempItem)}
            />
            <Button 
              variant="primary" 
              className="ms-2"
              onClick={() => handleAddItem("professionalInfo", "languagesSpoken", tempItem)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );

  const renderClinicInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaClinicMedical className="me-2" />Clinic Information</h5>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Clinic/Hospital Name*</Form.Label>
          <Form.Control 
            type="text" 
            value={doctorProfile.clinicInfo.clinicName}
            onChange={(e) => handleChange(e, "clinicInfo", "clinicName")}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Address*</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2}
            value={doctorProfile.clinicInfo.address}
            onChange={(e) => handleChange(e, "clinicInfo", "address")}
            required
          />
        </Form.Group>
        
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>City*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.clinicInfo.city}
                onChange={(e) => handleChange(e, "clinicInfo", "city")}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.clinicInfo.state}
                onChange={(e) => handleChange(e, "clinicInfo", "state")}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Pincode*</Form.Label>
              <Form.Control 
                type="text" 
                value={doctorProfile.clinicInfo.pincode}
                onChange={(e) => handleChange(e, "clinicInfo", "pincode")}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Country*</Form.Label>
          <Form.Control 
            type="text" 
            value={doctorProfile.clinicInfo.country}
            onChange={(e) => handleChange(e, "clinicInfo", "country")}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Clinic Photos</Form.Label>
          <Form.Control 
            type="file" 
            multiple
            accept="image/*"
            onChange={(e) => handleChange(e, "clinicInfo", "clinicPhotos")}
          />
          {doctorProfile.clinicInfo.clinicPhotos.length > 0 && (
            <div className="mt-2">
              <small>{doctorProfile.clinicInfo.clinicPhotos.length} photos selected</small>
            </div>
          )}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Facilities Available</Form.Label>
          <div className="mb-2">
            {doctorProfile.clinicInfo.facilities.map((facility, index) => (
              <Badge pill bg="warning" text="dark" className="me-2 mb-2" key={index}>
                {facility}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-dark p-0 ms-1"
                  onClick={() => handleRemoveItem("clinicInfo", "facilities", index)}
                >
                  <FaTimes />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Add facility (e.g., Parking, Wheelchair Access)"
              value={tempItem}
              onChange={(e) => setTempItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem("clinicInfo", "facilities", tempItem)}
            />
            <Button 
              variant="primary" 
              className="ms-2"
              onClick={() => handleAddItem("clinicInfo", "facilities", tempItem)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );

  const renderEducationInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaUniversity className="me-2" />Education</h5>
      </Card.Header>
      <Card.Body>
        {doctorProfile.education.length > 0 ? (
          <ListGroup>
            {doctorProfile.education.map((edu, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>{edu.degree}</h6>
                  <p className="mb-1">{edu.institution}</p>
                  <small className="text-muted">{edu.year}</small>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-danger"
                  onClick={() => handleRemoveItem("education", "", index)}
                >
                  <FaTimes />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info">No education details added yet</Alert>
        )}
        
        <Form className="mt-3">
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Degree*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="MBBS, MD, etc."
                  value={newItem.degree || ""}
                  onChange={(e) => setNewItem({...newItem, degree: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Institution*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="University/College name"
                  value={newItem.institution || ""}
                  onChange={(e) => setNewItem({...newItem, institution: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Year*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="YYYY"
                  value={newItem.year || ""}
                  onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button 
            variant="primary" 
            onClick={() => {
              if (newItem.degree && newItem.institution && newItem.year) {
                handleAddComplexItem("education", newItem);
                setNewItem({});
              }
            }}
          >
            <FaPlus className="me-1" /> Add Education
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderAwardsInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaAward className="me-2" />Awards & Recognition</h5>
      </Card.Header>
      <Card.Body>
        {doctorProfile.awards.length > 0 ? (
          <ListGroup>
            {doctorProfile.awards.map((award, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>{award.title}</h6>
                  <p className="mb-1">{award.organization}</p>
                  <small className="text-muted">{award.year}</small>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-danger"
                  onClick={() => handleRemoveItem("awards", "", index)}
                >
                  <FaTimes />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info">No awards added yet</Alert>
        )}
        
        <Form className="mt-3">
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Award Title*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Award name"
                  value={newItem.title || ""}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Organization*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Issuing organization"
                  value={newItem.organization || ""}
                  onChange={(e) => setNewItem({...newItem, organization: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Year*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="YYYY"
                  value={newItem.year || ""}
                  onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button 
            variant="primary" 
            onClick={() => {
              if (newItem.title && newItem.organization && newItem.year) {
                handleAddComplexItem("awards", newItem);
                setNewItem({});
              }
            }}
          >
            <FaPlus className="me-1" /> Add Award
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderMembershipInfo = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaUserMd className="me-2" />Professional Memberships</h5>
      </Card.Header>
      <Card.Body>
        {doctorProfile.membership.length > 0 ? (
          <ListGroup>
            {doctorProfile.membership.map((member, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>{member.organization}</h6>
                  <p className="mb-1">{member.role}</p>
                  <small className="text-muted">{member.duration}</small>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-danger"
                  onClick={() => handleRemoveItem("membership", "", index)}
                >
                  <FaTimes />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info">No memberships added yet</Alert>
        )}
        
        <Form className="mt-3">
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Organization*</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Medical association name"
                  value={newItem.organization || ""}
                  onChange={(e) => setNewItem({...newItem, organization: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Member/Board member/etc."
                  value={newItem.role || ""}
                  onChange={(e) => setNewItem({...newItem, role: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="2015-Present"
                  value={newItem.duration || ""}
                  onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button 
            variant="primary" 
            onClick={() => {
              if (newItem.organization) {
                handleAddComplexItem("membership", newItem);
                setNewItem({});
              }
            }}
          >
            <FaPlus className="me-1" /> Add Membership
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderSubscriptionTab = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5><FaFileInvoiceDollar className="me-2" />Subscription Plans</h5>
      </Card.Header>
      <Card.Body>
        {subscription.paymentStatus === "paid" ? (
          <Alert variant="success">
            <FaCheckCircle className="me-2" />
            You have an active {subscription.plan} subscription. 
            Your profile is {subscription.verificationStatus === "pending" 
              ? "pending admin verification" 
              : "verified and visible to patients"}.
          </Alert>
        ) : (
          <>
            <p className="text-muted mb-4">
              Choose a subscription plan to make your profile visible to patients
            </p>
            <Row className="g-4">
              {subscriptionPlans.map(plan => (
                <Col md={4} key={plan.id}>
                  <Card className={`h-100 ${subscription.plan === plan.id ? "border-primary" : ""}`}>
                    <Card.Body className="text-center">
                      <Card.Title>{plan.name}</Card.Title>
                      <Card.Subtitle className="my-3">
                        <h3>₹{plan.price}</h3>
                        <small className="text-muted">per month</small>
                      </Card.Subtitle>
                      <ul className="text-start mb-4 ps-3">
                        {plan.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                      <Button 
                        variant={subscription.plan === plan.id ? "primary" : "outline-primary"}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        {subscription.plan === plan.id ? "Proceed to Payment" : "Select Plan"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4"><FaUserMd className="me-2" />Doctor Dashboard</h2>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="basic" title="Basic Info">
          {renderBasicInfo()}
        </Tab>
        <Tab eventKey="professional" title="Professional Info">
          {renderProfessionalInfo()}
        </Tab>
        <Tab eventKey="clinic" title="Clinic Info">
          {renderClinicInfo()}
        </Tab>
        <Tab eventKey="education" title="Education">
          {renderEducationInfo()}
        </Tab>
        <Tab eventKey="awards" title="Awards">
          {renderAwardsInfo()}
        </Tab>
        <Tab eventKey="membership" title="Memberships">
          {renderMembershipInfo()}
        </Tab>
        <Tab eventKey="subscription" title="Subscription">
          {renderSubscriptionTab()}
        </Tab>
      </Tabs>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlan && (
            <>
              <div className="text-center mb-4">
                <h4>{selectedPlan.name} Plan</h4>
                <h2 className="text-primary">₹{selectedPlan.price}</h2>
                <p className="text-muted">per month</p>
              </div>
              
              <Card className="mb-4">
                <Card.Header>
                  <h5>Plan Features</h5>
                </Card.Header>
                <Card.Body>
                  <ul>
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
              
              <Card>
                <Card.Header>
                  <h5>Payment Details</h5>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control type="text" placeholder="MM/YY" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control type="text" placeholder="123" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Cardholder Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Name on card"
                        value={`${doctorProfile.basicInfo.firstName} ${doctorProfile.basicInfo.lastName}`}
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
              
              <Alert variant="info" className="mt-3">
                Note: This is a demo. In a real application, you would integrate with a payment gateway like Razorpay or Stripe.
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePaymentSuccess}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={48} className="text-success mb-3" />
          <h4>Thank you for your payment</h4>
          <p>
            Your {selectedPlan?.name} subscription is now active. Your profile will be 
            visible to patients after admin verification (usually within 24 hours).
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Continue to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Save Profile Button */}
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" onClick={handleSaveProfile}>
          Save Profile
        </Button>
      </div>
    </Container>
  );
};

export default DoctorDashboard;