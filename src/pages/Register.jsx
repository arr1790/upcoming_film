import React, { useState, useContext } from "react";
import authService from "../authService";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Register() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { isLogged, setIsLogged } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const user = await authService.register(email, password); // Cambié a register
            localStorage.setItem("user", JSON.stringify(user));
            setIsLogged(true);
            setLoading(false);
            navigate("/"); // Redirige al usuario después de un registro exitoso
        } catch (error) {
            console.error("Error de registro:", error); // Esto te ayudará a ver el error en la consola
            setError("Registro incorrecto");
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        {loading ? 'Registrando...' : 'Registro'}
                    </h2>
                    <Spinner loading={loading} />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                                Email
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
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="passwordConfirm" className="block text-sm/6 font-medium text-white">
                                    Confirmar Contraseña
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    required
                                    autoComplete="current-password-confirm"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Registro
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthContext.Provider>
    );
}
