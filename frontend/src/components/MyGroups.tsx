import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllGroupsQuery, useJoinGroupMutation, useCreateGroupMutation } from "../services/api";
import { selectGroup } from "../store/reducers/groupSlice";
import { IGroup } from "../types";
import { RootState } from "../store/store";
import { Box, Button, Card, Checkbox, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";

const GroupChatList = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);

  const { data: allGroupsData, isLoading, error } = useGetAllGroupsQuery();
  const [joinGroup] = useJoinGroupMutation();
  const [createGroup, { isLoading: isCreating, error: createError, isSuccess }] = useCreateGroupMutation();

  const [groupName, setGroupName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error loading groups</Typography>;

  const allGroups: IGroup[] = allGroupsData?.data || [];

  const myGroups = allGroups.filter(group => group.admin === currentUserId);
  const joinedGroups = allGroups.filter(group => group.admin !== currentUserId && group.participants?.includes(currentUserId));
  const groupsToJoin = allGroups.filter(group => group.admin !== currentUserId && !group.participants?.includes(currentUserId));

  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinGroup({ groupId }).unwrap();
      alert("Successfully joined the group!");
    } catch (err) {
      alert("Failed to join the group.");
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return alert("Group name is required");

    try {
      await createGroup({ name: groupName, isPublic }).unwrap();
      alert("Group created successfully!");
      setGroupName("");
      setIsPublic(true);
      setOpenModal(false); // Close modal after success
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <Box sx={{
      minHeight: "86vh",
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      bgcolor: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    }}>

      {/* Create Group Button */}
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        sx={{
          mb: 3,
          bgcolor: "#6A0DAD",
          borderRadius: 2,
          "&:hover": { bgcolor: "#800080", transform: "scale(1.05)" },
        }}
      >
        Create Group
      </Button>

      {/* Modal for Creating Group */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h5" sx={{ color: "#E0E0E0", mb: 2, textAlign: "center" }}>Create a Group</Typography>
          <form onSubmit={handleCreateGroup}>
            <TextField
              label="Group Name"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 2,
                input: { color: "#E0E0E0" },
                label: { color: "#E0E0E0" },
                "& .MuiOutlinedInput-root": { borderColor: "#E0E0E0" },
              }}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Checkbox
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                sx={{ color: "#E0E0E0" }}
              />
              <Typography color="#E0E0E0">Public Group</Typography>
            </Box>
            <Button type="submit" fullWidth variant="contained" sx={{
              bgcolor: "#6A0DAD",
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": { bgcolor: "#800080", transform: "scale(1.05)" },
            }}>
              {isCreating ? <CircularProgress size={24} color="inherit" /> : "Create Group"}
            </Button>
            {isSuccess && <Typography color="success" sx={{ mt: 2 }}>Group created successfully!</Typography>}
            {createError && <Typography color="error" sx={{ mt: 2 }}>Error creating group</Typography>}
          </form>
        </Box>
      </Modal>

      {/* Group Lists */}
      <Box sx={{ overflowY: "auto", maxHeight: "75vh", width: "100%", maxWidth: 500 }}>
        {[
          { title: "My Groups", groups: myGroups },
          { title: "Joined Groups", groups: joinedGroups },
          { title: "Groups to Join", groups: groupsToJoin, joinable: true }
        ].map(({ title, groups, joinable }) => (
          <Box key={title} sx={{ width: "100%", mb: 4 }}>
            <Typography variant="h5" sx={{ color: "#1f1c40", mb: 2 }}>{title}</Typography>
            {groups.length === 0 ? (
              <Typography sx={{ color: "#1f2c40" }}>No groups found</Typography>
            ) : (
              groups.map(group => (
                <motion.div key={group._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)" },
                  }}
                    onClick={() => !joinable && dispatch(selectGroup(group._id))}
                  >
                    <Typography sx={{ color: "#1f2c40" }}>{group.name}</Typography>
                    {joinable && (
                      <Button variant="contained" sx={{
                        bgcolor: "#6A0DAD",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#800080", transform: "scale(1.05)" },
                      }} onClick={() => handleJoinGroup(group._id)}>
                        Join
                      </Button>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GroupChatList;
