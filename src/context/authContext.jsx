import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setWelcomeMessage("🎬 ¡Bienvenido! Disfruta de la cartelera 🎟️");
    } else {
      setWelcomeMessage(""); // Aseguramos que el mensaje de bienvenida esté vacío si no está logueado
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setIsLogged(!!updatedUser);
      if (updatedUser) {
        setWelcomeMessage("🎬 ¡Bienvenido de nuevo! Disfruta de la cartelera 🎟️");
      } else {
        setWelcomeMessage("")
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, welcomeMessage, setWelcomeMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
