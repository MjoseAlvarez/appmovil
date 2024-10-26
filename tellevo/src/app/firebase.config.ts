// src/app/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG0-mZSO93DJmV8PgYF9-Gt5sKlG0Rkjs",
  authDomain: "appmovil-f83ba.firebaseapp.com",
  projectId: "appmovil-f83ba",
  storageBucket: "appmovil-f83ba.appspot.com",
  messagingSenderId: "945121709256",
  appId: "1:945121709256:web:0e1857a2aba93e6bfb69fd"
};

// Inicializar Firebase y la autenticación
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
