import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setMessages, addMessage } from "../store/reducers/userSlice";
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useSendMessageMutation, useGetMessagesForUserQuery, useUserQuery } from "../services/api";
import Lottie from "lottie-react";
import chatAnimation from "../assets/no-chat-selected.json";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = useSelector((state: RootState) => state.user.messages);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  // Fetch user details
  const { data: userData } = useUserQuery({ id: selectedUserId! }, { skip: !selectedUserId });

  // Fetch messages
  const { data, isLoading, error } = useGetMessagesForUserQuery(
    { recipient: selectedUserId! },
    { skip: !selectedUserId }
  );

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      dispatch(setMessages(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUserId || !userId) return;

    try {
      const response = await sendMessage({
        sender: userId,
        content: message,
        recipient: selectedUserId,
      }).unwrap();

      dispatch(
        addMessage({
          _id: response.data._id,
          sender: userId,
          recipient: selectedUserId,
          content: message,
        })
      );

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Extract user's name and first letter for avatar
  const userName = userData?.data?.name || "User";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        borderLeft: "2px solid #5A189A",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #3A0CA3, #5A189A)",
        height: "90vh",
        overflowY: selectedUserId ? "auto" : "hidden",
      }}
    >
      {selectedUserId ? (
        <>
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            style={{
              cursor: "pointer",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#9D4EDD",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar sx={{ width: 50, height: 50, bgcolor: "#FFD700", color: "#1E1E1E", fontWeight: "bold" }}>
              {avatarLetter}
            </Avatar>
            <Typography variant="h5" fontWeight="bold" style={{ marginRight: "auto", marginLeft: "auto" }} color="white">
              {userName.toLocaleUpperCase()}
            </Typography>
          </motion.div>

          {/* Messages Section */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              background: "#2D005F",
              color: "white",
              borderRadius: "12px",
              mt: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Failed to load messages</Typography>
            ) : messages.length > 0 ? (
              messages.map((msg) => {
                const isMyMessage = msg.sender === userId;
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      display: "flex",
                      flexDirection: isMyMessage ? "row-reverse" : "row",
                      alignItems: "center",
                      justifyContent: isMyMessage ? "flex-end" : "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    {!isMyMessage && (
                      <Avatar sx={{ bgcolor: "#FFC107", color: "#1E1E1E", fontWeight: "bold" }}>
                        {avatarLetter}
                      </Avatar>
                    )}
                    <Box
                      sx={{
                        ml: isMyMessage ? "0px" : "10px",
                        mr: isMyMessage ? "10px" : "0px",
                        p: 1.5,
                        maxWidth: "70%",
                        bgcolor: isMyMessage ? "#6A0572" : "#4A148C",
                        borderRadius: isMyMessage ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        color: "#fff",
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                    </Box>
                  </motion.div>
                );
              })
            ) : (
              <Typography color="white">No messages yet.</Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Field & Send Button */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={isSending}
                sx={{
                  bgcolor: "#FFD700",
                  color: "#1E1E1E",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": { bgcolor: "#FFC107" },
                }}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </motion.div>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
          <Lottie animationData={chatAnimation} loop style={{ width: 300, height: 300 }} />
          <Typography variant="h6" color="white" textAlign="center">
            Select a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
