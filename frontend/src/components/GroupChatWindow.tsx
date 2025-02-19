import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useGetMessagesForGroupQuery, useSendMessageMutation, useGetGroupByIdQuery } from "../services/api";
import { setMessages, addMessage } from "../store/reducers/groupSlice";
import { Box, Button, CircularProgress, Divider, TextField, Typography, Modal, Fade } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import chatAnimation from "../assets/no-chat-selected.json"; // Lottie Animation JSON

const GroupChatWindow = () => {
  const dispatch = useDispatch();
  const selectedGroupId = useSelector((state: RootState) => state.group.selectedGroupId);
  const messages = useSelector((state: RootState) => state.group.messages);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Fetch group details
  const { data: groupData, isLoading: isGroupLoading } = useGetGroupByIdQuery(
    { _id: selectedGroupId! },
    { skip: !selectedGroupId }
  );
  // console.log(groupData);
  // Fetch messages
  const { data, isLoading, error } = useGetMessagesForGroupQuery(
    { group: selectedGroupId! },
    { skip: !selectedGroupId }
  );

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [message, setMessage] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      dispatch(setMessages(data.data));
    }
  }, [data, dispatch]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedGroupId || !userId) return;

    try {
      const response = await sendMessage({
        sender: userId,
        content: message,
        group: selectedGroupId,
      }).unwrap();

      dispatch(
        addMessage({
          _id: response.data._id,
          sender: userId,
          group: selectedGroupId,
          content: message,
        })
      );

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        borderLeft: "2px solid #5A189A",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #3A0CA3, #5A189A)",
        borderRadius: "2px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        height: "90vh",
        overflow: selectedGroupId ? "auto" : "hidden",
      }}
    >
      {selectedGroupId ? (
        <>
          {/* Group Header - Click to toggle description */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowDescription((prev) => !prev)}
            style={{
              cursor: "pointer",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#9D4EDD",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isGroupLoading ? (
              <CircularProgress size={24} color="inherit" sx={{ alignSelf: "center" }} />
            ) : (
              <>
                {/* Group Name - Click to Open Description */}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setOpen(true)}
                >
                  {groupData?.name || "Loading..."}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {groupData?.isPublic ? "Public Group" : "Private Group"}
                </Typography>
                <Divider sx={{ my: 2, bgcolor: "#6A0572" }} />
                <Typography variant="body2">
                  <strong>Admin:</strong> {groupData?.admin || "Unknown"}
                </Typography>
              </>
            )}
          </motion.div>

          {/* Group Description - Toggled on Click */}
          <AnimatePresence>
            {showDescription && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginTop: "8px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#7B2CBF",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="white">
                  {groupData?.description || "No description available"}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              borderRadius: "12px",
              p: 2,
              background: "#2D005F",
              color: "white",
              minHeight: "400px",
              maxHeight: "500px",
              fontSize: "2rem",
              mt: 2,
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">Failed to load messages.</Typography>
            ) : messages.length > 0 ? (
              messages?.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.5,
                      maxWidth: "80%",
                      bgcolor: msg.sender?._id === userId ? "#6A0572" : "#4A148C",
                      borderRadius: msg.sender?._id === userId ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      alignSelf: msg.sender?._id === userId ? "flex-end" : "flex-start",
                      color: "#fff",
                      display: "inline-block",
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" sx={{ opacity: 0.8 }}>
                      {msg.sender === userId ? "You" : msg.sender?.name || "Joseph"}
                    </Typography>
                    <Typography variant="body1">{msg.content}</Typography>
                  </Box>
                </motion.div>
              ))
            ) : (
              <Typography color="white">No messages yet.</Typography>
            )}
          </Box>

          {/* Input & Send Button */}
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
          <Lottie animationData={chatAnimation} style={{ width: 250, height: 250 }} />
          <Typography variant="h6" color="white" textAlign="center">
            Select a group to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GroupChatWindow;
