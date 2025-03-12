import React, { useState } from "react";
import authService from "../authService";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Cartelera() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validación básica de contraseña
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authService.register(name, email, password); // Enviar el nombre también
            setLoading(false);
            navigate("/login"); // Redirigir a la página de inicio de sesión
        } catch (error) {
            setLoading(false);

            // Manejo de errores específicos
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || error.response.data.error;

                if (errorMessage.includes("contraseña")) {
                    setError("La contraseña no cumple con los requisitos.");
                } else if (errorMessage.includes("email")) {
                    setError("El correo electrónico ya está registrado.");
                } else {
                    setError("Error en el registro. Inténtalo de nuevo.");
                }
            } else {
                setError("Error en el registro. Inténtalo de nuevo.");
            }
        }
    };

    const handleClose = () => {
        navigate("/"); // Redirigir a la página principal
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="relative p-6 bg-gray-800 rounded-lg shadow-lg sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Botón de cerrar (X) */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
                >
                    ×
                </button>

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    {loading ? 'Registrando...' : 'REGÍSTRATE EN MI CARTELERA'}
                </h2>
                <p className="text-center text-white mt-2">
                    🎬 Descubre las últimas películas, las más populares y más. ¡Únete y vive el cine!
                </p>
                <Spinner loading={loading} />

                <div className="mt-10">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-white font-semibold hover:bg-blue-500"
                        >
                            Registro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}