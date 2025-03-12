import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

const authentication = getAuth(); // Obtiene la instancia de autenticación

const authService = {
  // Registro de un nuevo usuario
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, email, password); // Crea un nuevo usuario 
      return userCredential.user; // Devuelve el usuario registrado
    } catch (error) {
      throw new Error(error.message); // Lanzar el error si ocurre
    }
  },

  // Inicio de sesión con email y contraseña
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await signOut(authentication);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default authService;
