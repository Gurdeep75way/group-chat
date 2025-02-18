import { useGetAllGroupsQuery } from "../services/api";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";
import { motion } from "framer-motion";
import { IGroup } from "../types";

interface Props {
  onSelectGroup: (group: IGroup) => void;
  selectedGroupId: string | null;
}

const GroupChatList = ({ onSelectGroup, selectedGroupId }: Props) => {
  const { data, isLoading } = useGetAllGroupsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "30%", height: "100vh", borderRight: "1px solid #ccc", overflowY: "auto", bgcolor: "#f5f5f5" }}>
      <List>
        {data?.data?.map((group: IGroup) => (
          <motion.div key={group._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ListItem
              button
              onClick={() => {
                console.log("Selected Group:", group);
                onSelectGroup(group);
              }}
              sx={{
                bgcolor: selectedGroupId === group._id ? "#ddd" : "inherit",
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              <ListItemAvatar>
                <Avatar>{group.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={group.name} />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
};

export default GroupChatList;
