//code của mình
import LineGraph from "./LineGraph";
import GroupsTable from "./Table/GroupsTable";

const GroupsManager = () => {
  return (
    <div>
      <LineGraph type={"groups"} />
      <GroupsTable/>
    </div>
  );
};

export default GroupsManager;
