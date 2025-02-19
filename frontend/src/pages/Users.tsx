import { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import UserList from "../components/chatList";
import ChatWindow from "../components/chatWindow";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ChatPage = () => {
    const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    return (
        <Box sx={{ display: "flex", height: "92vh", width: "100%" }}>
            {/* Show User List when no user is selected (Mobile) OR always on Desktop */}
            {(!isMobile || !selectedUser) && (
                <Box
                    sx={{
                        width: isMobile ? "100%" : "30%",
                        borderRight: isMobile ? "none" : "1px solid gray",
                        p: 2,
                        display: selectedUser && isMobile ? "none" : "block",
                    }}
                >
                    <UserList onSelectUser={setSelectedUser} />
                </Box>
            )}

            {/* Show Chat Window when a user is selected (Mobile) OR always on Desktop */}
            {(selectedUser || !isMobile) && (
                <Box sx={{ flexGrow: 1, display: selectedUser || !isMobile ? "block" : "none", position: "relative" }}>
                    {isMobile && selectedUser && (
                        <Button
                            onClick={() => setSelectedUser(null)}
                            sx={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                zIndex: 10,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "#fff",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
                            }}
                        >
                            ← Back
                        </Button>
                    )}
                    <ChatWindow selectedUserId={selectedUser} />
                </Box>
            )}
        </Box>
    );
};

export default ChatPage;
