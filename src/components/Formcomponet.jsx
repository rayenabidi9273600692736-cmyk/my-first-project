import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Formcomponent = () => {
  const navigate = useNavigate();
  
  // State management
  const [formData, setFormData] = useState({
    identifiant: '',
    email: '',
    mdp: '',
    nombre: ''
  });

  const [errors, setErrors] = useState({
    identifiant: false,
    email: false,
    mdp: false,
    nombre: false
  });

  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validerIdentifiant = (value) => {
    if (value.length < 3 || value.length > 20) {
      setErrors((prev) => ({...prev, identifiant: true}));
      return false;
    } else {
      setErrors((prev )=> ({...prev, identifiant: false}));
      return true;
    }
  };

  const validerEmail = (value) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({...prev, email: true}));
      return false;
    } else {
      setErrors((prev) => ({...prev, email: false}));
      return true;
    }
  };

  const validerNombre = (value) => {
    if (isNaN(value) || value.length !== 8) {
      setErrors((prev) => ({...prev, nombre: true}));
      return false;
    } else {
      setErrors((prev )=> ({...prev, nombre: false}));
      return true;
    }
  };

  const verifMDP = (value) => {
    if (value.length < 6 || value.length > 20) {
      setErrors((prev )=> ({...prev, mdp: true}));
      return false;
    } else {
      setErrors((prev )=> ({...prev, mdp: false}));
      return true;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev )=> ({...prev, [id]: value}));
    
    // Remove error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({...prev, [id]: false}));
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { id, value } = e.target;
    
    switch(id) {
      case 'identifiant':
        validerIdentifiant(value);
        break;
      case 'email':
        validerEmail(value);
        break;
      case 'nombre':
        validerNombre(value);
        break;
      case 'mdp':
        verifMDP(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const valideId = validerIdentifiant(formData.identifiant);
    const valideEmail = validerEmail(formData.email);
    const valideNombre = validerNombre(formData.nombre);
    const verification = verifMDP(formData.mdp);
    
    if (!valideId || !valideEmail || !valideNombre || !verification) {
      alert("Veuillez corriger les champs invalides.");
      return false;
    } else {
      // You can send data to server here
      console.log('Form data:', formData);
      
      // Navigate to success page or dashboard
      navigate("/Appi"); // استخدم مسار صحيح
      return true;
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Forgot Password clicked - Cette fonctionnalité sera implémentée bientôt.');
  };

  return (
    <div style={styles.container}>
      <div className="bg-img" style={styles.bgImg}>
        <div style={styles.content}>
          <header style={styles.header}>Formulaire de l'utilisateur</header>
          <form onSubmit={handleSubmit} style={styles.form} action='http://localhost:8080/ap1i/v1/auth/register' method='POST'>
            {/* Name field */}
            <div style={styles.field}>
              <i className="fa fa-user" style={styles.icon}></i>
              <input 
                type="text" 
                id="identifiant" 
                placeholder={errors.identifiant ? "Nom invalide" : "Enter Your Name"}
                value={formData.identifiant}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{...styles.input, ...(errors.identifiant ? styles.errorInput : {})}}
              />
            </div>

            {/* Email field */}
            <div style={styles.field}>
              <i className="fa fa-envelope" style={styles.icon}></i>
              <input 
                type="email" 
                id="email" 
                placeholder={errors.email ? "Email invalide" : "Enter Email"}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{...styles.input, ...(errors.email ? styles.errorInput : {})}}
              />
            </div>

            {/* Password field */}
            <div style={styles.field}>
              <i className="fa fa-lock" style={styles.icon}></i>
              <input 
                type={showPassword ? "text" : "password"}
                id="mdp" 
                placeholder={errors.mdp ? "Mot de passe invalide" : "Enter Password"}
                value={formData.mdp}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{...styles.input, ...(errors.mdp ? styles.errorInput : {})}}
              />
              <span 
                style={styles.showButton}
                onClick={togglePasswordVisibility}
                onKeyDown={(e) => e.key === 'Enter' && togglePasswordVisibility()}
                tabIndex={0}
                role="button"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>

            {/* CIN field */}
            <div style={styles.field}>
              <i className="fa fa-id-card" style={styles.icon}></i>
              <input 
                type="text" 
                id="nombre" 
                placeholder={errors.nombre ? "CIN invalide (8 chiffres)" : "CIN (8 chiffres)"}
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{...styles.input, ...(errors.nombre ? styles.errorInput : {})}}
              />
            </div>

            {/* Forgot password link */}
            <div style={styles.pass}>
              <button 
                type="button"
                onClick={handleForgotPassword}
                style={styles.forgotButton}
              >
                Forgot Password
              </button>
            </div>

            {/* Submit button */}
            <div style={styles.field}>
              <button 
                type="submit" 
                style={styles.submitButton}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
    </div>
  );
};

// CSS Styles in JavaScript
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    background: '#f5f5f5',
  },
  bgImg: {
    background: "url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80') no-repeat",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
    padding: '60px 40px',
    width: '400px',
    maxWidth: '90%',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '35px',
    fontFamily: "'Montserrat', sans-serif",
  },
  form: {
    width: '100%',
  },
  field: {
    position: 'relative',
    marginBottom: '25px',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#666',
    zIndex: 2,
  },
  input: {
    width: '100%',
    padding: '15px 15px 15px 45px',
    fontSize: '16px',
    border: '2px solid #e1e1e1',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
  },
  errorInput: {
    borderColor: '#e74c3c',
    backgroundColor: '#fff5f5',
    color: '#e74c3c',
  },
  showButton: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    userSelect: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.2s',
  },
  pass: {
    textAlign: 'right',
    marginBottom: '25px',
  },
  forgotButton: {
    background: 'none',
    border: 'none',
    color: '#3498db',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 0',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
};

export default Formcomponent;