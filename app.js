import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Let's define our user data
const userData = {
  company: "BRUXX DEV",
  name: "Fariol Blondeau",
  email: "blondeau.nbif@brx-nbif.com",
  password: "54636Fahgg2gjak",
};

// Function to authenticate our user
const createUser = ({email, password}) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`The user ${user.email} is created successfully`);
    })
    .catch((err) => console.log(err.message));
};
createUser({...userData}); //Here we set the authentication of the user with email and password

// Function to save our user to the database
const saveUser = async ({company, name, email }) => {
  const userRef = collection(db, "users");

  try {
    const docRef = await addDoc(userRef, {
      company: company,                   //We save our user to the table with the company, name and email
      name: name,
      email: email,
    });
    console.log(`The user ${docRef.id} is saved successfully to the database`);
  } catch (err) {
    console.log(`Error adding document: ${err.message}`);
  }
};
saveUser({...userData});

// Function to read data from our database
const readDoc = async () => {
  const userRef = collection(db, "users");
  const querySnapshot = await getDocs(userRef);

  querySnapshot.forEach((item) => console.log({ ...item.data(), id: item.id }));
};

readDoc();

// Function to update a special user data with id
const updateUser = async (id) => {
  const docRef = doc(db, "users", id);
  const updatedField = { email: "willyblondeau@brx-nbif.ru" };

  await updateDoc(docRef, updatedField)
    .then(() => console.log(`The user ${docRef.id} has been updated successfully`))
    .catch((err) => console.log(err.message));
};
updateUser("5v9qvK6vtWZc7HrdQfuj")

// Function to delete a specific user with id
const deleteUser = async (id) => {
  const docRef = doc(db, "users", id);
  
  await deleteDoc(docRef)
  .then(() => console.log(`The user ${docRef.id} is deleted successfully`))
  .catch(err => console.log(err.message))
};
deleteUser("5v9qvK6vtWZc7HrdQfuj");
