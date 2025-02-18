import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useSendMessageMutation, useGetMessagesForGroupQuery } from "../services/api";
import { IGroup } from "../types";

interface Props {
  selectedGroup: IGroup | null;
}

const GroupChatWindow = ({ selectedGroup }: Props) => {
  const [message, setMessage] = useState("");
  const { data, refetch } = useGetMessagesForGroupQuery({ groupId: selectedGroup?._id || "" }, { skip: !selectedGroup });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (selectedGroup) {
      refetch();
    }
  }, [selectedGroup]);

  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedGroup) return;
    await sendMessage({ content: message, groupId: selectedGroup._id });
    setMessage("");
    refetch();
  };

  if (!selectedGroup) return <Typography>Select a group to chat</Typography>;

  return (
    <Box sx={{ width: "70%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <Box sx={{ display: "flex", alignItems: "center", padding: 2, borderBottom: "1px solid #ccc", bgcolor: "#eee" }}>
        <Typography variant="h6">{selectedGroup.name}</Typography>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {data?.data?.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Box
              sx={{
                textAlign: msg.sender === selectedGroup._id ? "left" : "right",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  bgcolor: msg.sender === selectedGroup._id ? "#ddd" : "#4caf50",
                  color: msg.sender === selectedGroup._id ? "black" : "white",
                  borderRadius: "10px",
                  padding: "8px 12px",
                }}
              >
                {msg.content}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* Message Input */}
      <Box sx={{ display: "flex", alignItems: "center", borderTop: "1px solid #ccc", p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default GroupChatWindow;
