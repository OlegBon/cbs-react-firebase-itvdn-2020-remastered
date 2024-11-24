import "./GetDataFromDB.css";

const GetDataFromDB = ({ data }) => {
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
    <div className="Get-Data-From-DB">
      <h3>Database Content:</h3>
      {renderData(data)}
    </div>
  );
};

export default GetDataFromDB;
