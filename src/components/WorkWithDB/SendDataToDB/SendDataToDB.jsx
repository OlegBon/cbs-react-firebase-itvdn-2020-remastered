import "./SendDataToDB.css";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { database } from "../../../firebase-config";

const SendDataToDB = () => {
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
    const dbRef = ref(database, key);
    push(dbRef, value)
      .then(() => {
        console.log("Value added successfully!");
        setValue("");
      })
      .catch((error) => console.error("Error adding value:", error));
  };

  return (
    <div className="Send-Data-To-DB">
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
    </div>
  );
};

export default SendDataToDB;
