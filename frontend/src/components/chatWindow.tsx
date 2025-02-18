import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useSendMessageMutation, useGetMessagesForUserQuery } from "../services/api";

interface User {
  _id: string;
  name: string;
  avatar: string;
}

interface Props {
  selectedUser: User | null;
}

const ChatWindow = ({ selectedUser }: Props) => {
  const [message, setMessage] = useState("");
  const { data, refetch } = useGetMessagesForUserQuery({ userId: selectedUser?._id || "" }, { skip: !selectedUser });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (selectedUser) {
      refetch();
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedUser) return;
    await sendMessage({ content: message, userId: selectedUser._id });
    setMessage("");
    refetch();
  };

  if (!selectedUser) return <Typography>Select a user to chat</Typography>;

  return (
    <Box sx={{ width: "70%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <Box sx={{ display: "flex", alignItems: "center", padding: 2, borderBottom: "1px solid #ccc", bgcolor: "#eee" }}>
        <Avatar src={selectedUser.avatar} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          {selectedUser.name}
        </Typography>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {data?.data?.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Box
              sx={{
                textAlign: msg.sender === selectedUser._id ? "left" : "right",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  bgcolor: msg.sender === selectedUser._id ? "#ddd" : "#4caf50",
                  color: msg.sender === selectedUser._id ? "black" : "white",
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

export default ChatWindow;
