import "./LogOutDB.css";
import { getAuth, signOut } from "firebase/auth";

const LogOutDB = ({ app, setHasAccount, setEmail, setPassword }) => {
  const logOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log("You Are Logged Out");
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
