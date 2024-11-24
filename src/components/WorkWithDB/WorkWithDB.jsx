import "./WorkWithDB.css";
import { getDatabase, ref, push } from "firebase/database";
import { useState } from "react";
import LogOutDB from "./LogOutDB/LogOutDB";
import ClearDB from "./ClearDB/ClearDB";

const WorkWithDB = ({
  app,
  setHasAccount,
  setEmail,
  setPassword,
  data,
  setData,
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const sendData = () => {
    if (!key || !value) {
      console.log("Both Key and Value Are Required!");
      return;
    }
    if (/[.#$[\]]/.test(key)) {
      console.log("Invalid Key Characters.");
      return;
    }
    const db = getDatabase(app);
    const dbRef = ref(db, key);
    push(dbRef, value)
      .then(() => {
        console.log("Value added successfully!");
        setValue("");
      })
      .catch((error) => console.error("Error adding value:", error));
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
      <LogOutDB
        app={app}
        setHasAccount={setHasAccount}
        setEmail={setEmail}
        setPassword={setPassword}
      />
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
      <button onClick={sendData}>Add Value</button>
      <ClearDB app={app} setData={setData} />
      <div>
        <h3>Database Content:</h3>
        {renderData(data)}
      </div>
    </div>
  );
};

export default WorkWithDB;
