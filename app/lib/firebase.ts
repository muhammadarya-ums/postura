import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYiVe9JoI-CdwWRPFzFQ0kI9q5WLL3QK8",
  authDomain: "postura-23114.firebaseapp.com",
  projectId: "postura-23114",
  storageBucket: "postura-23114.appspot.com",
  messagingSenderId: "317898718757",
  appId: "1:317898718757:web:d23871846b7616238b9758",
  databaseURL: "https://postura-23114-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);