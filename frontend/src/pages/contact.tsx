import React from "react";
import { Box, Typography, Container, Card } from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contact.json"; // Add a Lottie JSON file

const ContactUs = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                color: "#fff",
                textAlign: "center",
                p: 3,
            }}
        >
            {/* Background Effects */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "20%",
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(255,0,150,0.4) 20%, rgba(0,0,0,0) 80%)",
                    borderRadius: "50%",
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "15%",
                    width: "250px",
                    height: "250px",
                    background: "radial-gradient(circle, rgba(0,150,255,0.4) 20%, rgba(0,0,0,0) 80%)",
                    borderRadius: "50%",
                }}
            />

            <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
                {/* Lottie Animation */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <Lottie animationData={contactAnimation} loop={true} style={{ height: 200, marginBottom: 20 }} />
                </motion.div>

                {/* Contact Details */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                        Contact Us
                    </Typography>
                    <Card
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <Typography variant="body1" sx={{ color: "#ddd", mb: 1 }}>
                            📍 <strong>Address:</strong> 75way Technologies, Chandigarh, India
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#ddd", mb: 1 }}>
                            📞 <strong>Phone:</strong> +91 98765 43210
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#ddd" }}>
                            ✉️ <strong>Email:</strong> contact@75way.com
                        </Typography>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ContactUs;
