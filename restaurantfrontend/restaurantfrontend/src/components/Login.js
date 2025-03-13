import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import {UserContext} from "../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {userContext,updateUserContext } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, roleId, userId } = await login({ username, password });
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", roleId);
      localStorage.setItem("userId", userId);
      updateUserContext({ token: token, role: roleId?.toString(), userId: userId });
      navigate("/menu-items"); // Redirect to Menu Items after login
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
