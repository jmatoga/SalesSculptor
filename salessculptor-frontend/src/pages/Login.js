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
      console.log("d" + values.username + "!" + values.passwordHash + "!");
      console.log("!" + sessionStorage.getItem("loggedIn"));
      axios
        .post(`http://localhost:8090/accounts/login`, values)
        .then((res) => {
          console.log("!" + res.data);

          alert("Logged successfully!");
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("loggedId", res.data.split(": ").pop());
          console.log("!" + sessionStorage.getItem("loggedIn"));
          navigate("/campaigns");
          console.log("mp");
        })
        .catch((error) => {
          if (error.response) {
            // Obsługa błędu z odpowiedzią od serwera z kodem statusu inny niż 2xx
            console.log("Server responded with an error:", error.response.data);
            if (error.response.status === 400) {
              // Obsługa błędnego żądania (status 400)
              alert("Invalid username or password. Please try again.");
              // Wyczyść dane sesji
              sessionStorage.clear();
            } else {
              // Obsługa innych błędów
              alert("An error occurred. Please try again later.");
            }
          } else if (error.request) {
            // Obsługa żądania, które nie otrzymało odpowiedzi
            console.log("No response received:", error.request);
            alert(
              "No response received from the server. Please try again later."
            );
          } else {
            // Inne błędy
            console.log("Error setting up the request:", error.message);
            alert("Error setting up the request. Please try again later.");
          }
          // Wyczyść dane sesji
          // sessionStorage.clear();
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