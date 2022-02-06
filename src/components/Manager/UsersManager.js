
//code của mình

import LineGraph from "./LineGraph";
import UsersTable from "./Table/UsersTable";

const UsersManager = () => {
  return <div>
      <LineGraph type={"users"}/>
      <UsersTable/>
  </div>
};

export default UsersManager;
