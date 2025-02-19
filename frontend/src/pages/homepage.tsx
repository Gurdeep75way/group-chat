import { Box, Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  { title: "Real-time Messaging", description: "Chat instantly with friends & groups." },
  { title: "End-to-End Encryption", description: "Your conversations are private & secure." },
  { title: "Seamless Media Sharing", description: "Share images, videos, and documents effortlessly." },
  { title: "Customizable Themes", description: "Personalize your chat experience with themes & layouts." },
];

const testimonials = [
  { name: "John Doe", feedback: "Sleek, fast, and secure! Love the elegant UI. 🌟" },
  { name: "Sophia Lee", feedback: "Feels like a premium product. The dark mode is amazing! 😍" },
  { name: "Michael Brown", feedback: "Smooth animations and rich features. Great job! 👏" },
];

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "white",
        px: 3,
        py: 5,
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" fontWeight="bold" sx={{ fontFamily: "Poppins, sans-serif" }} gutterBottom>
          Elevate Your Group Chats 🚀
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "600px", opacity: 0.9 }}>
          A cutting-edge chat platform with security, elegance, and real-time connectivity.
        </Typography>
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Button
          component={Link}
          to="/users"
          variant="contained"
          sx={{
            mt: 4,
            background: "linear-gradient(90deg, #ff8c00, #ff2d55)",
            fontSize: "18px",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "linear-gradient(90deg, #ff2d55, #ff8c00)" },
          }}
        >
          Start Chatting 💬
        </Button>
      </motion.div>

      {/* Features Section */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "Poppins, sans-serif" }} gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    color: "white",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                    <Typography sx={{ opacity: 0.8 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "Poppins, sans-serif" }} gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: "170px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    color: "white",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ fontStyle: "italic" }}>"{testimonial.feedback}"</Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold" }}>
                      - {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ mt: 10, py: 3, background: "rgba(255, 255, 255, 0.1)", width: "100%", backdropFilter: "blur(5px)" }}>
        <Typography variant="body2">© 2025 Group Chat. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
