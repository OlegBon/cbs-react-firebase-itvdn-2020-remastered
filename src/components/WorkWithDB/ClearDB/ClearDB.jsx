import { getDatabase, ref, remove } from "firebase/database";
import "./ClearDB.css";

const ClearDB = ({ app, setData }) => {
  const clearDatabase = () => {
    if (window.confirm("Are You Sure You Want To Clear The Database?")) {
      const db = getDatabase(app);
      const rootRef = ref(db, "/");
      remove(rootRef)
        .then(() => {
          console.log("Database Has Been Cleared!");
          setData({});
        })
        .catch((error) => console.error("Error Clearing Database:", error));
    }
  };
  return (
    <div className="Clear-DB">
      <button onClick={clearDatabase}>Clear Database</button>
    </div>
  );
};

export default ClearDB;
