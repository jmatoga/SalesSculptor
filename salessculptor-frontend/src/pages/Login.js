import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    username: "",
    passwordHash: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (
      validationErrors.username === "" &&
      validationErrors.passwordHash === ""
    ) {
      axios
        .post(`http://localhost:8090/accounts/login`, values)
        .then((res) => {
          alert("Logged successfully!");
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("loggedId", res.data.split(": ").pop());
          navigate("/campaigns");
        })
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with an error:", error.response.data);
            if (error.response.status === 400) {
              alert("Invalid username or password. Please try again.");
              sessionStorage.clear();
            } else {
              alert("An error occurred. Please try again later.");
            }
          } else if (error.request) {
            console.log("No response received:", error.request);
            alert(
              "No response received from the server. Please try again later."
            );
          } else {
            console.log("Error setting up the request:", error.message);
            alert("Error setting up the request. Please try again later.");
          }
          console.log(error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center">Login to your account</h2>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              name="username"
              type="username"
              placeholder="Enter Username"
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.username && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.username}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              name="passwordHash"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.password && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.passwordHash}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
