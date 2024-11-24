import React, { useState, useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { initializeApp } from "firebase/app";
import LogInToDB from "./components/LogInToDB/LogInToDB";
import WorkWithDB from "./components/WorkWithDB/WorkWithDB";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
// console.log(app); // Перевіряємо app

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db, "/");
    onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
    return () => off(rootRef);
  }, []);

  return (
    <div>
      {hasAccount ? (
        <WorkWithDB
          app={app}
          setHasAccount={setHasAccount}
          setEmail={setEmail}
          setPassword={setPassword}
          data={data}
          setData={setData}
        />
      ) : (
        <LogInToDB
          app={app}
          email={email}
          password={password}
          setHasAccount={setHasAccount}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
