import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const state = { user, token, loading };

  const dispatch = (action) => {
    switch (action.type) {
      case "LOGIN":
        setUser(action.payload.user);
        setToken(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        break;
      case "LOGOUT":
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        break;
      case "SET_LOADING":
        setLoading(action.payload);
        break;
      default:
        break;
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
