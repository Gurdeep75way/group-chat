import { useGetUserInvitationsQuery } from "../services/api";
import { Box, Typography, Paper, CircularProgress, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const Invitations = () => {
  const { data, error, isLoading } = useGetUserInvitationsQuery();

  if (isLoading)
    return (
      <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="error">
          Error fetching invitations.
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "90%",
          maxWidth: "800px",
          borderRadius: "15px",
          padding: 4,
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}>
            Invitations
          </Typography>

          {data?.length > 0 ? (
            <Grid container spacing={2}>
              {data.map((invite, index) => (
                <Grid item xs={12} key={invite._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        padding: "15px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(5px)",
                        color: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="body1">Group: {invite?.groupId}</Typography>
                        <Typography variant="body2" color="yellow">
                          Status: {invite.status}
                        </Typography>
                      </Box>
                      <Box>
                        <Button variant="contained" color="success" sx={{ marginRight: 1 }}>
                          Accept
                        </Button>
                        <Button variant="contained" color="error">
                          Reject
                        </Button>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", color: "lightgray" }}>
              No invitations available.
            </Typography>
          )}
        </motion.div>
      </Paper>
    </Box>
  );
};

export default Invitations;
