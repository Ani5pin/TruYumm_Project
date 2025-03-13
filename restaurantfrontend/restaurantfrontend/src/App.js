import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

const App = () => {
  const navigate = useNavigate();

  const { userContext, updateUserContext } = useContext(UserContext);

  console.log("userContext", userContext);

  // const [token, setToken] = useState(localStorage.getItem("token"));
  // const [role, setRole] = useState(localStorage.getItem("userRole"));
  // const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownMenuRef = useRef(null);

  // useEffect(() => {
  //   // setToken(localStorage.getItem("token"));
  //   // setRole(localStorage.getItem("userRole"));
  //   // setUserId(localStorage.getItem("userId"));
  // }, []);

  const handleLogout = () => {
    // setToken(null);
    updateUserContext({ token: "", role: "", userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate('/');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    updateUserContext({ token: token, role: role, userId: userId });
    // if (token) {
    //   navigate("/menu-items");
    // } else {
    //   navigate("/");
    // }
  }, []);

  return (
    <div className="app-container">
      <header>
        {userContext.token ? (
          <div className="bg-dark text-white">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center py-3">
                <h1 className="h3">truYum</h1>
                <nav className="d-flex align-items-center position-relative">
                  <h2
                    onClick={handleMenuToggle}
                    className="text-white cursor-pointer me-2"
                  >
                    Menu
                  </h2>

                  {isMenuOpen && (
                    <div
                      ref={dropdownMenuRef}
                      className="position-absolute bg-dark shadow rounded p-3"
                      style={{ zIndex: 1000 }}
                    >
                      <ul className="list-unstyled text-white">
                        <li>
                          <Link className="dropdown-item" to="/menu-items">
                            Menu List
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/menu-save/0">
                            Add Menu Item
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}

                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-dark text-white">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center py-3">
                <h1 className="h3">truYum</h1>
                <Link to="/" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
