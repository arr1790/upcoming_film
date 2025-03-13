import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const [rememberMe, setRememberMe] = useState(false); // Estado para "Recuérdame"
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password, rememberMe });
    };

    const handleClose = () => {
        navigate("/"); // para ir al inicio
    };

    return (
        <div className="relative p-6 bg-gray-800 rounded-lg shadow-lg">
         
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
            >
                ×
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                        Correo electrónico
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                            Contraseña
                        </label>
                    </div>
                    <div className="mt-2 relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"} // Cambia el tipo de input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                        {/* Botón para mostrar/ocultar contraseña */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                        >
                            {showPassword ? (
                                <span role="img" aria-label="Ocultar contraseña">👁️</span>
                            ) : (
                                <span role="img" aria-label="Mostrar contraseña">👁️‍🗨️</span>
                            )}
                        </button>
                    </div>
                </div>

               

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>

            
        </div>
    );
}