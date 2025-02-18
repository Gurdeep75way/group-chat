import { Avatar, Box, Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups"; // Example icon
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Example icon
import PeopleIcon from "@mui/icons-material/People"; // Example icon

type Props = {
  data: User;
};

// Animation variants for staggered effects
const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function UserProfile(props: Props) {
  const { name, email, role } = props.data;

  // Example group data, you can replace it with real data
  const groupsCreated = 5;
  const groupsJoined = 8;
  const totalUsersInGroups = 50;

  // Animation controls
  const controls = useAnimation();

  useEffect(() => {
    controls.start("onscreen");
  }, [controls]);

  return (
    <Box
      minHeight="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#0B0C10"
      padding={{ xs: 2, md: 4 }}
    >
      <Box
        width="100%"
        maxWidth="1200px"
        borderRadius={4}
        overflow="hidden"
        sx={{
          background: "linear-gradient(145deg, #1A1A2E, #2C2F38)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid container spacing={4} padding={4}>
          {/* User Details Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={cardVariants}
            >
              <Card
                sx={{
                  background: "#1A1A2E",
                  color: "#E0E0E0",
                  borderRadius: 2,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={name} sx={{ width: 100, height: 100 }}>
                      {name[0]}
                    </Avatar>
                    <Box ml={3}>
                      <Typography variant="h5" fontWeight="bold" color="#bcb8ff">
                        {name}{" "}
                        <Typography
                          textTransform="lowercase"
                          variant="subtitle1"
                          component="span"
                          color="#A9A9A9"
                        >
                          ({role})
                        </Typography>
                      </Typography>
                      <Typography color="#A9A9A9">{email}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2, borderRadius: "8px" }}
                        onClick={() => alert("Edit User clicked")}
                      >
                        Edit User
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Group Statistics Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {/* Groups Created Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={cardVariants}
                >
                  <Card
                    sx={{
                      background: "#2C2F38",
                      color: "#E0E0E0",
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "transform 0.3s",
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <GroupsIcon sx={{ fontSize: 40, color: "#bcb8ff" }} />
                        <Box ml={2}>
                          <Typography variant="h6" fontWeight="bold" color="#bcb8ff">
                            {groupsCreated}
                          </Typography>
                          <Typography variant="body2" color="#A9A9A9">
                            Groups Created
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Groups Joined Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={cardVariants}
                >
                  <Card
                    sx={{
                      background: "#2C2F38",
                      color: "#E0E0E0",
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "transform 0.3s",
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <PersonAddIcon sx={{ fontSize: 40, color: "#bcb8ff" }} />
                        <Box ml={2}>
                          <Typography variant="h6" fontWeight="bold" color="#bcb8ff">
                            {groupsJoined}
                          </Typography>
                          <Typography variant="body2" color="#A9A9A9">
                            Groups Joined
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Total Users Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={cardVariants}
                >
                  <Card
                    sx={{
                      background: "#2C2F38",
                      color: "#E0E0E0",
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "transform 0.3s",
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <PeopleIcon sx={{ fontSize: 40, color: "#bcb8ff" }} />
                        <Box ml={2}>
                          <Typography variant="h6" fontWeight="bold" color="#bcb8ff">
                            {totalUsersInGroups}
                          </Typography>
                          <Typography variant="body2" color="#A9A9A9">
                            Total Users
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}