import "./LogInToDB.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LogInToDB = ({
  email,
  password,
  setHasAccount,
  setEmail,
  setPassword,
}) => {
  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Your Are Sign In");
        setHasAccount(true);
      })
      .catch((error) => console.error("Error Signing In:", error));
  };

  const createAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Your Are Create Account");
        setHasAccount(true);
      })
      .catch((error) => console.error("Error Creating Account:", error));
  };

  return (
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
  );
};

export default LogInToDB;
