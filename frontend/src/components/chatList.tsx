// import { useGetAllUsersQuery } from "../services/api";
// import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import { User } from "../types"; // ✅ Importing User type correctly

// interface Props {
//   onSelectUser: (user: User) => void;
//   selectedUserId: string | null;
// }

// const UserList = ({ onSelectUser, selectedUserId }: Props) => {
//   const { data, isLoading } = useGetAllUsersQuery();

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <Box sx={{ width: "30%", height: "100vh", borderRight: "1px solid #ccc", overflowY: "auto", bgcolor: "#f5f5f5" }}>
//       <List>
//         {data?.data?.map((user: User) => (
//           <motion.div key={user._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <ListItem
//               button
//               onClick={() => onSelectUser(user)}
//               sx={{
//                 bgcolor: selectedUserId === user._id ? "#ddd" : "inherit",
//                 "&:hover": { bgcolor: "#e0e0e0" },
//               }}
//             >
//               <ListItemAvatar>
//                 <Avatar src={user.avatar} />
//               </ListItemAvatar>
//               <ListItemText primary={user.name} />
//             </ListItem>
//           </motion.div>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default UserList;
