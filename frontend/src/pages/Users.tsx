// import { useState } from "react";
// import { Box } from "@mui/material";
// import UserList from "../components/chatList";
// import ChatWindow from "../components/chatWindow";
// import { User } from "../types"; // ✅ Importing correctly

// const ChatApp = () => {
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);

//     return (
//         <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
//             <UserList onSelectUser={(user) => setSelectedUser(user)} selectedUserId={selectedUser?._id || null} />
//             <ChatWindow selectedUser={selectedUser} />
//         </Box>
//     );
// };

// export default ChatApp;
