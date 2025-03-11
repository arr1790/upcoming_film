import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Agregar el mensaje de bienvenida

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setWelcomeMessage("¡Bienvenido a la Cartelera!");
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setIsLogged(!!updatedUser);
      if (updatedUser) {
        setWelcomeMessage("¡Bienvenido a la Cartelera!"); // Actualizar el mensaje cuando el usuario inicie sesión
      } else {
        setWelcomeMessage(""); // Limpiar el mensaje si el usuario se desloguea
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, welcomeMessage, setWelcomeMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
