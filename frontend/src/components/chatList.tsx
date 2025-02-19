import { useSelector, useDispatch } from "react-redux";
import { useGetAllUsersQuery } from "../services/api";
import { selectUser } from "../store/reducers/userSlice";
import { Avatar, List, ListItemAvatar, ListItemText, Box, CircularProgress, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { User } from "../types";

const UserList = () => {
    const dispatch = useDispatch();
    const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);
    const { data: usersData, isLoading, error } = useGetAllUsersQuery();
    const allUsers: User[] = usersData?.data || [];

    const handleSelectUser = (user: User) => {
        dispatch(selectUser(user._id)); // Set selected user in Redux
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Error loading users</Typography>;
    }

    return (
        <Box
            sx={{
                position: "fixed",
                width: "100%",
                maxWidth: 420,
                height: "100vh",
                bgcolor: "#f5f5f5",
                boxShadow: "2px 0px 10px rgba(17, 17, 17, 0.1)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Fixed Heading */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "#ffffff",
                    zIndex: 10,
                    p: 2,
                    textAlign: "center",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#09080f" }}>
                    Users
                </Typography>
            </Box>

            {/* Scrollable User List */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                {allUsers.length === 0 ? (
                    <Typography color="gray" textAlign="center">
                        No users found
                    </Typography>
                ) : (
                    <List>
                        {allUsers.map((user) => (
                            <motion.div key={user._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        bgcolor: "#ffffff",
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        "&:hover": { boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
                                    }}
                                    onClick={() => handleSelectUser(user)}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} sx={{ width: 50, height: 50, border: "2px solid #ddd" }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        primaryTypographyProps={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            color: "#333",
                                        }}
                                    />
                                </Card>
                            </motion.div>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default UserList;
