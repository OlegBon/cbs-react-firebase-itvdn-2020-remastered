import "./WorkWithDB.css";
import LogOutDB from "./LogOutDB/LogOutDB";
import ClearDB from "./ClearDB/ClearDB";
import GetDataFromDB from "./GetDataFromDB/GetDataFromDB";
import SendDataToDB from "./SendDataToDB/SendDataToDB";

const WorkWithDB = ({
  app,
  setHasAccount,
  setEmail,
  setPassword,
  data,
  setData,
}) => {
  return (
    <div className="Work-With-DB">
      <LogOutDB
        app={app}
        setHasAccount={setHasAccount}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <SendDataToDB app={app} />
      <ClearDB app={app} setData={setData} />
      <GetDataFromDB data={data} />
    </div>
  );
};

export default WorkWithDB;
