import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

const authentication = getAuth();

const authService = {
    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(authentication, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    logout: async () => {
      try {
        await signOut(authentication);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };

export default authService;
