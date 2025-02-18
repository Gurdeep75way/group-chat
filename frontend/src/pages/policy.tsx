import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../assets/privacy-policy-animation.json"; // Replace with your animation JSON file path

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

export default function PrivacyPolicy() {
    const theme = useTheme();

    return (
        <Box
            minHeight="100vh"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#0B0C10"
            padding={{ xs: 1, md: 0 }}
        >
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={{ xs: 4, md: 8 }}
                >
                    {/* Animation Side */}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flex={1}
                        maxWidth={{ xs: "100%", md: "50%" }}
                        bgcolor="#1A1A2E"
                        padding={4}
                        borderRadius={2}
                        sx={{
                            boxShadow: theme.shadows[10],
                        }}
                    >
                        <Lottie
                            options={defaultOptions}
                            height="auto"
                            width="100%"
                            style={{ maxWidth: "300px" }}
                        />
                    </Box>

                    {/* Privacy Policy Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            flex: 1,
                            padding: "2rem",
                            background: "#1A1A2E",
                            color: "#E0E0E0",
                            borderRadius: 8,
                            overflowY: "auto",
                            maxHeight: "60vh",
                            boxShadow: theme.shadows[10],
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="#bcb8ff"
                            textAlign="center"
                            mb={3}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography variant="body1" color="#A9A9A9" paragraph>
                            We respect your privacy and are committed to protecting the personal
                            information you share with us. This Privacy Policy outlines how we
                            collect, use, and safeguard your data when you interact with our
                            platform.
                        </Typography>
                        <Typography variant="h6" color="#fff" mt={2}>
                            Information Collection
                        </Typography>
                        <Typography variant="body1" color="#A9A9A9" paragraph>
                            We collect personal information such as your name, email address, and
                            other details you provide. Additionally, we may use cookies to track
                            usage and enhance user experience.
                        </Typography>
                        <Typography variant="h6" color="#fff" mt={2}>
                            How We Use Your Information
                        </Typography>
                        <Typography variant="body1" color="#A9A9A9" paragraph>
                            The collected information is used to improve our services, communicate
                            with you, and provide personalized content. We do not share your
                            personal data with third parties unless required by law.
                        </Typography>
                        <Typography variant="h6" color="#fff" mt={2}>
                            Data Security
                        </Typography>
                        <Typography variant="body1" color="#A9A9A9" paragraph>
                            We take reasonable measures to protect your data from unauthorized
                            access, alteration, or destruction. However, no method of transmission
                            over the internet is 100% secure.
                        </Typography>
                        <Typography variant="h6" color="#fff" mt={2}>
                            Changes to This Policy
                        </Typography>
                        <Typography variant="body1" color="#A9A9A9" paragraph>
                            We may update this Privacy Policy from time to time. Any changes will
                            be posted on this page with the updated date.
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#A9A9A9"
                            align="center"
                            mt={3}
                            fontStyle="italic"
                        >
                            Last updated: February 2025
                        </Typography>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
}