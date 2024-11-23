import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, // Импортируем signOut для разлогинивания
} from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  remove,
} from "firebase/database";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const rootRef = ref(db, "/");
    const onValueChange = onValue(rootRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => off(rootRef, "value", onValueChange);
  }, []);

  const createAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => setHasAccount(true))
      .catch((error) => console.error("Error creating account:", error));
  };

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setHasAccount(true))
      .catch((error) => console.error("Error signing in:", error));
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setHasAccount(false); // Сброс состояния, когда пользователь разлогинен
        setEmail(""); // Очистка полей ввода
        setPassword("");
      })
      .catch((error) => console.error("Error signing out:", error));
  };

  const sendData = () => {
    if (!key) {
      console.log("Key cannot be empty!");
      return;
    }

    if (/[.#$[\]]/.test(key)) {
      console.log(
        "Key contains invalid characters. Please avoid '.', '#', '$', '[', or ']'"
      );
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, key);
    push(dbRef, value)
      .then(() => {
        console.log("Your data was written to DB");
        setKey("");
        setValue("");
      })
      .catch((error) => console.error("Error writing data:", error));
  };

  const clearDatabase = () => {
    if (window.confirm("Are you sure you want to clear the database?")) {
      const db = getDatabase();
      const rootRef = ref(db, "/");
      remove(rootRef)
        .then(() => {
          console.log("Database has been cleared!");
          setData({});
        })
        .catch((error) => console.error("Error clearing database:", error));
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
        <div className="login_block">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={createAccount}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default App;
