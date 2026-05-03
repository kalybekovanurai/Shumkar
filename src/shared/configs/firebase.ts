import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  appId: "XXX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
