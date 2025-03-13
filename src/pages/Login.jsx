import LoginForm from "../components/LoginForm";
import React, { useState, useContext } from "react";
import authService from "../authService";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(AuthContext);

  
  if (isLogged) {
    navigate("/"); // Redirige a la página principal si ya está logueado
    return null;  
  }

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogged(true);  // Cambia el estado a logueado
      setLoading(false);
      navigate("/");  
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          {loading ? 'Iniciando Sesión' : 'Iniciar Sesión'}
        </h2>
        <Spinner loading={loading} />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
