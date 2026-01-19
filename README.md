import React, { useState } from "react";


function SignUpForm() {
  const [identifiant, setIdentifiant] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [nombre, setNombre] = useState("");

  const [errorIdentifiant, setErrorIdentifiant] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMDP, setErrorMDP] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);

  const handleIdentifiantBlur = () => {
    if (identifiant.length < 3 || identifiant.length > 20) {
      setErrorIdentifiant(true);
      setIdentifiant("");
    } else {
      setErrorIdentifiant(false);
    }
  };

  const handleEmailBlur = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(email)) {
      setErrorEmail(true);
      setEmail("");
    } else {
      setErrorEmail(false);
    }
  };

  const handleMDPBlur = () => {
    if (mdp.length < 6 || mdp.length > 20) {
      setErrorMDP(true);
      setMdp("");
    } else {
      setErrorMDP(false);
    }
  };

  const handleNombreBlur = () => {
    if (isNaN(nombre) || nombre.length !== 8) {
      setErrorNombre(true);
      setNombre("");
    } else {
      setErrorNombre(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleIdentifiantBlur();
    handleEmailBlur();
    handleMDPBlur();
    handleNombreBlur();

    if (!errorIdentifiant && !errorEmail && !errorMDP && !errorNombre) {
      alert("Formulaire soumis avec succès !");
      // Ici vous pouvez envoyer les données à un backend
    } else {
      alert("Veuillez corriger les champs invalides.");
    }
  };

  return (
    <body style={{backgroundColor:"#1c2c50",color:"white" }}> 
      
      <div className="content" style={{position:"absolute",bottom:"150px",right:"700px"}}>
        <header style={{fontSize:"25px"}}>Formulaire de l'utilisateur</header>
        <form onSubmit={handleSubmit}>
          <div style={{margin:"40px 0"}}>
            <label>Nom & prenom</label>
          
            <input 
              type="text"
              
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              onBlur={handleIdentifiantBlur}
              placeholder={errorIdentifiant ? "Nom invalide" : "Enter Your Name"}
              style={{ border: errorIdentifiant ? "2px solid #f00" : "" }}
            />
         </div>
        <div style={{margin:"40px 0"}}>
             <label>Email</label>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder={errorEmail ? "Email invalide" : "Enter Email"}
              style={{ border: errorEmail ? "2px solid #f00" : "" }}
            />
          </div>
          <div style={{margin:"40px 0"}}>
           <label>password</label>
          
            <input
              type="password"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              onBlur={handleMDPBlur}
              placeholder={errorMDP ? "Mot de passe invalide" : "Enter Password"}
              style={{ border: errorMDP ? "2px solid #f00" : "" }}
            />
          </div>
          <div style={{margin:"40px 0"}}>
             <label>CIN</label>
          
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={handleNombreBlur}
              placeholder={errorNombre ? "CIN invalide" : "CIN"}
              style={{ border: errorNombre ? "2px solid #f00" : "" }}
            />
            </div>
            <div >
            <input type="submit" value="Sign up" />
         </div> 
        </form>
      </div>
 </body>
  );
}
    
