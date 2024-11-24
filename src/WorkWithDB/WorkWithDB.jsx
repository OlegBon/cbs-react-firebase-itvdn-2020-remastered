import "./WorkWithDB.css";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, push, remove } from "firebase/database";
import { useState } from "react";

const WorkWithDB = ({
  setHasAccount,
  setEmail,
  setPassword,
  data,
  setData,
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

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
    <div className="Work-With-DB">
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
  );
};

export default WorkWithDB;
