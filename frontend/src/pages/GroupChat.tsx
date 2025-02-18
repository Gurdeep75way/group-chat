import { useState } from "react";
import { Box } from "@mui/material";
import GroupChatList from "../components/GroupChatList";
import GroupChatWindow from "../components/GroupChatWindow";
import { IGroup } from "../types";

const GroupChatApp = () => {
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

  const handleSelectGroup = (group: IGroup) => {
    console.log("Updating selectedGroup to:", group);
    setSelectedGroup(group);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <GroupChatList onSelectGroup={handleSelectGroup} selectedGroupId={selectedGroup?._id || null} />
      <GroupChatWindow selectedGroup={selectedGroup} />
    </Box>
  );
};

export default GroupChatApp;
