import React, { createContext, useState } from "react";

const UserContext = createContext({
  userContext: {
    token: "",
    role: "",
    userId: "",
  },
  updateUserContext: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    token: "",
    role: "",
    userId: null,
  });

  const updateUserContext = (value) => {
    debugger
    setUserContext(value);
  };
  return (
    <UserContext.Provider value={{ userContext, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
