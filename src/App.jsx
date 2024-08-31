import * as React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    courses: '',
  });

  const [errors, setErrors] = useState({});
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Assuming phone number should be 10 digits
    return phoneRegex.test(phone);
  };

  const validateUsername = (username) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(username);
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.username) {
      formErrors.username = "Name is required";
    } else if (!validateUsername(formData.username)) {
      formErrors.username = "Name should contain only letters";
    }

    if (!formData.address) formErrors.address = "Address is required";
    
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      formErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.dob) formErrors.dob = "Date of Birth is required";
    if (!formData.courses) formErrors.courses = "Course selection is required";
    
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      alert("Form submitted successfully!");
    }
  };

  const onResetHandler = () => {
    setFormData({
      username: '',
      address: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      courses: '',
    });
    setErrors({});
  };

  return (
    <div className="row container mt-3 vh-100 d-100">
      <div className="col-lg-4"></div>
      <div className="col-lg-5 shadow-lg">
        <h3>SCHOOL REGISTRATION FORM</h3>
        <Form onSubmit={onSubmitHandler}>

          <Form.Group className="mb-3">
            <Form.Label className='text-dark fw-bold'>Enter your name</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={onChangeHandler} 
              placeholder="Enter in capital letters" 
              className={`bg-secondary-emphasis text-dark ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className='text-dark fw-bold'>Enter your Address</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              name="address" 
              value={formData.address} 
              onChange={onChangeHandler} 
              className={`bg-secondary-emphasis text-dark ${errors.address ? 'is-invalid' : ''}`}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </Form.Group>

          <Form.Group className="mb-3 text-dark fw-bold">
            <Form.Label>Email your address</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={onChangeHandler} 
              placeholder="name@example.com" 
              className={`bg-secondary-emphasis text-dark ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3 text-dark fw-bold">
            <Form.Label>Phone number</Form.Label>
            <Form.Control 
              type="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={onChangeHandler} 
              placeholder="Enter a valid phone number" 
              className={`bg-secondary-emphasis text-dark ${errors.phone ? 'is-invalid' : ''}`}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className='text-dark fw-bold'>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChangeHandler}
              required
              className={`${errors.dob ? 'is-invalid' : ''}`}
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Gender</Form.Label>
            <Form.Check
              type="radio"
              id="male"
              name="gender"
              value="Male"
              label="Male"
              onChange={onChangeHandler}
              checked={formData.gender === 'Male'}
              className={`text-dark ${errors.gender ? 'is-invalid' : ''}`}
            />
            <Form.Check
              type="radio"
              id="female"
              name="gender"
              value="Female"
              label="Female"
              onChange={onChangeHandler}
              checked={formData.gender === 'Female'}
              className={`text-dark ${errors.gender ? 'is-invalid' : ''}`}
            />
            <Form.Check
              type="radio"
              id="other"
              name="gender"
              value="Other"
              label="Other"
              onChange={onChangeHandler}
              checked={formData.gender === 'Other'}
              className={`text-dark ${errors.gender ? 'is-invalid' : ''}`}
            />
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Courses</Form.Label>
            <Form.Select 
              name="courses" 
              value={formData.courses} 
              onChange={onChangeHandler} 
              className={`${errors.courses ? 'is-invalid' : ''}`}
            >
              <option value="">Select a course</option>
              <option value="B.sc Computer Science">B.sc Computer Science</option>
              <option value="Bachelor of computer Application">Bachelor of Computer Application</option>
              <option value="B.com">B.com</option>
              <option value="B.sc Electronics">B.sc Electronics</option>
            </Form.Select>
            {errors.courses && <div className="invalid-feedback">{errors.courses}</div>}
          </Form.Group>

          <button className="bg-success w-100 btn btn-primary shadow" type="submit">Register</button>
          <button className="bg-danger mt-3 w-100 btn btn-primary shadow" type="reset" onClick={onResetHandler}>Reset</button>

        </Form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
}

export default App;
