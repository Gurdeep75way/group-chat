import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#2C2F38",
                color: "#fff",
                flexDirection: "column",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" component="h1" sx={{ fontSize: "5rem", fontWeight: "bold" }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Oops! The page you're looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#6A5ACD",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "12px",
                    '&:hover': {
                        backgroundColor: "#4C51BF",
                    },
                }}
                onClick={() => navigate("/")}
            >
                Go Back to Home
            </Button>
        </Box>
    );
}
