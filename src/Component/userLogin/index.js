import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/index";

function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("jwtToken", token);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <section
        class="vh-120"
        style={{ backgroundColor: "white", marginTop: "30px" }}
      >
        <div class="container py-4 h-60">
          <div class="row d-flex justify-content-center align-items-center h-60">
            <div class="col col-xl-9">
              <div class="card" style={{ borderRadius: "1rem" }}>
                <div class="row g-0">
                  <div class="col-md-4 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-4 text-black">
                      <form>
                        <p
                          style={{
                            color: "rgb(130, 124, 124)",
                            fontSize: "14px",
                          }}
                        >
                          *Personal Information Collected by the Bank will not
                          be Disclosed
                        </p>

                        <div class="d-flex align-items-center mb-3 pb-1">
                          <span
                            class="h1 fw-bold mb-0"
                            style={{ color: "#98144d" }}
                          >
                            Logo
                          </span>
                        </div>

                        <h5
                          class="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            class="form-control form-control-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label class="form-label" for="form2Example17">
                            UserName
                          </label>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            class="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label class="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div class="pt-1 mb-4">
                          <button
                            class="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogin}
                            style={{ backgroundColor: "#98144d" }}
                          >
                            Login
                          </button>{" "}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/images/dadLogin.jpg"
                      alt="login form"
                      class="img-fluid"
                      style={{ borderRadius: "1rem 1rem 1rem 1rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserLogin;
