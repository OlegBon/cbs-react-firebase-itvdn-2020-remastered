import React, { useState, useEffect } from "react";
import "./App.css";
import { ref, onValue, off } from "firebase/database";
import LogInToDB from "./components/LogInToDB/LogInToDB";
import WorkWithDB from "./components/WorkWithDB/WorkWithDB";
import { database } from "./firebase-config";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const rootRef = ref(database, "/");
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
          setHasAccount={setHasAccount}
          setEmail={setEmail}
          setPassword={setPassword}
          data={data}
          setData={setData}
        />
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
