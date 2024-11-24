import React, { useState, useEffect } from "react";
import "./App.css";
import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import LogInToDB from "./components/LogInToDB/LogInToDB";

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
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db, "/");
    const onValueChange = onValue(rootRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => off(rootRef, "value", onValueChange);
  }, []);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Your Are Log Out");
        setHasAccount(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error("Error Signing Out:", error));
  };

  const sendData = () => {
    if (!key) {
      console.log("Key Cannot Be Empty!");
      return;
    }

    if (/[.#$[\]]/.test(key)) {
      console.log(
        "Key Contains Invalid Characters. Please Avoid '.', '#', '$', '[', Or ']'"
      );
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, key);
    push(dbRef, value)
      .then(() => {
        console.log("Your Data Was Written To DB");
        setKey("");
        setValue("");
      })
      .catch((error) => console.error("Error Writing Data:", error));
  };

  const clearDatabase = () => {
    if (window.confirm("Are You Sure You Want To Clear The Database?")) {
      const db = getDatabase();
      const rootRef = ref(db, "/");
      remove(rootRef)
        .then(() => {
          console.log("Database Has Been Cleared!");
          setData({});
        })
        .catch((error) => console.error("Error Clearing Database:", error));
    }
  };

  const renderData = (data) => {
    if (!data || Object.keys(data).length === 0)
      return <p>No data available.</p>;

    const renderNode = (node, path = "") => {
      if (typeof node === "object") {
        return (
          <ul>
            {Object.keys(node).map((key) => (
              <li key={path + key}>
                <strong>{key}:</strong>
                {renderNode(node[key], path + key + "/")}
              </li>
            ))}
          </ul>
        );
      } else {
        return <span> {node}</span>;
      }
    };

    return renderNode(data);
  };

  return (
    <div>
      {hasAccount ? (
        <div>
          <button onClick={logOut}>Logout</button>
          <br />
          <input
            type="text"
            id="key"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            id="value"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendData}>Send Data</button>
          <button onClick={clearDatabase}>Clear Database</button>
          <div>
            <h3>Database Content:</h3>
            {renderData(data)}
          </div>
        </div>
      ) : (
        <LogInToDB
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
