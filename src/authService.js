import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  getAuth 
} from "firebase/auth";
import { app } from "./firebaseConfig";

const authentication = getAuth(app); 

const authService = {
 
  register: async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;

      
      await updateProfile(user, { displayName: name });

      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify({ 
        uid: user.uid, 
        name: user.displayName, 
        email: user.email 
      }));

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;

      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify({ 
        uid: user.uid, 
        name: user.displayName, 
        email: user.email 
      }));

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Obtener usuario actual desde localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },


  logout: async () => {
    try {
      await signOut(authentication);
      localStorage.removeItem("user");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default authService;
