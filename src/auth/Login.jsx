import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import InputBox from '../components/ui/InputBox';

import { jwtDecode } from 'jwt-decode';
// 🎨 Background Image Changer Component

const BackgroundChanger = ({ children }) => {
  const images = [
    "https://getwallpapers.com/wallpaper/full/8/9/c/150932.jpg",
    "https://getwallpapers.com/wallpaper/full/e/8/8/150915.jpg",
    "https://getwallpapers.com/wallpaper/full/4/f/9/150836.jpg",
  //"https://getwallpapers.com/wallpaper/full/7/6/2/150840.jpg"
  ];

  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundImage: `url("${bgImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
      transition: "background-image 1s ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {children}
    </div>
  );
};

// 🔐 Login Component
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();

    try {
      // await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post("/api/login", formData,{withCredentials:false});
      const token=sessionStorage.setItem("token", data.token);
      // const decodedToken = jwtDecode(token);

      // const expiryTime = decodedToken.exp * 1000;
      // const currentTime = Date.now();

      // if (currentTime > expiryTime) {
      //   console.log("Token expired");
      // } else {
      //   console.log("Token is still valid");
      // }
      // console.log('✅ Your token is:', data.token);

        // Set Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;


      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Login Failed");
      console.log("❌ Login not completed");
    }
  }, [formData, navigate]);

  return (
    <BackgroundChanger>
      {/* <div style={{
        background: "rgba(0, 0, 0, 0.7)", 
        padding: "30px", 
        borderRadius: "10px", 
        color: "white",
        width: "350px",
        textAlign: "center"
      }}>
        <h2>CRM UMRAHRAHAT</h2>
        <form onSubmit={handleLogin}>
         
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
           
          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}>Login</button>
        </form>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div> */}
      <div style={{
    background: "rgba(255, 255, 255, 0.9)", 
    padding: "40px", 
    borderRadius: "12px", 
    color: "#333",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)"
}}>
    <h2 style={{ 
    fontSize: "28px", 
    fontWeight: "700", 
    marginBottom: "20px", 
    color: "#2c3e50",
    fontFamily: "'Poppins', sans-serif", // Use a modern font like Poppins
    letterSpacing: "1px", // Slightly increase letter spacing for elegance
    textTransform: "uppercase", // Uppercase for a bold look
    background: "linear-gradient(90deg, #007bff, #00bfff)", // Gradient text color
    WebkitBackgroundClip: "text", // Clip background to text
    WebkitTextFillColor: "transparent", // Make text transparent to show gradient
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" // Subtle text shadow
}}>
    CRM HAJJUMRAHONLINE
</h2>
    <form onSubmit={handleLogin} style={{ width: "100%" }}>
   
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s ease",
                boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s ease",
                boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />
        <button
            type="submit"
            style={{
                width: "100%",
                padding: "12px",
                margin: "20px 0",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                boxSizing: "border-box"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
            Login
        </button>
    </form>
    {message && (
        <p style={{ 
            color: "#ff4d4f", 
            fontSize: "14px", 
            marginTop: "10px" 
        }}>
            {message}
        </p>
    )}
</div>
    </BackgroundChanger>
  );
};

export default Login;
