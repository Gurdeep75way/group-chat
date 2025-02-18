import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../assets/login-animation.json";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

type FormData = typeof validation.__outputType;

export default function LoginForm() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap();
      toast.success("User logged in successfully!");
      navigate("/", { replace: true });
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#0B0C10"
    >
      <Box display="flex" width="80%" maxWidth="1200px" boxShadow={3} borderRadius={4} overflow="hidden">
        {/* Animation Side */}
        <Box flex={1} display={{ xs: "none", md: "flex" }} alignItems="center" justifyContent="center" bgcolor="#1A1A2E">
          <Lottie options={defaultOptions} height={400} width={400} />
        </Box>

        {/* Login Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ flex: 1, padding: "2rem", background: "#1A1A2E", color: "#E0E0E0" }}
        >
          <Card variant="outlined" sx={{ background: "transparent", boxShadow: "none" }}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography fontSize="2rem" color="#bcb8ff" fontWeight="bold" textAlign="center">Welcome Back!</Typography>
                <Typography textAlign="center" color="#A9A9A9" fontSize="1.2rem" mb={3}>Sign in to continue</Typography>

                <Box mb={1}>
                  <Typography color="#fff" fontSize="1.2rem" mb={1}>Email:</Typography>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Email"
                    label=""
                    {...register("email")}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    sx={{
                      backgroundColor: "#2C2F38", // Input background color
                      color: "#f0f0f0", // Input text color
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                </Box>

                <Box mb={1}>
                  <Typography color="#fff" fontSize="1.2rem" mb={1}>Password:</Typography>
                  <PasswordInput
                    fullWidth
                    type="password"
                    placeholder="Password"
                    label=""
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password")}
                    sx={{
                      backgroundColor: "#2C2F38", // Input background color
                      color: "#f0f0f0", // Input text color
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                  sx={{
                    background: "#6A5ACD",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "10px",
                    '&:hover': { background: "#4C51BF" },
                  }}
                >
                  Log in
                </Button>

                <Typography textAlign="center" mt={2} color="#A9A9A9">
                  Don&apos;t have an account?{" "}
                  <NavLink to="/register" style={{ color: "#B0C4DE", textDecoration: "none", fontWeight: "bold" }}>Sign up</NavLink>
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </motion.div>
      </Box>
    </Box>
  );
}
