import { auth } from "../../../firebase-config";
import "./LogOutDB.css";
import { signOut } from "firebase/auth";

const LogOutDB = ({ setHasAccount, setEmail, setPassword }) => {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully Logged Out");
        setHasAccount(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error("Error Signing Out:", error));
  };

  return (
    <div className="Log-Out-DB">
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default LogOutDB;
