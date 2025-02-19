import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../assets/signup-animation.json"; // Replace with your actual Lottie file

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  name: yup.string().required("Name is required"),
});

const style = {
  root: {
    background: "transparent",
    boxShadow: "none",
  },
  input: {
    backgroundColor: "#2C2F38", // Input background color
    color: "#f0f0f0", // Input text color
    borderRadius: 2,
    mb: 2,
  },
  button: {
    background: "#6A5ACD",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: "10px",
    '&:hover': {
      background: "#4C51BF",
    },
  },
  link: {
    color: "#B0C4DE",
    textDecoration: "none",
    fontWeight: "bold",
  }
};



const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flex: 1,
      mx: "auto",
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
    },
    link: {
      color: theme.palette.primary.main,
    },
  });

type FormData = typeof validation.__outputType;

export default function SignupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Replace with your animation
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

        {/* Signup Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ flex: 1, padding: "2rem", background: "#1A1A2E", color: "#E0E0E0" }}
        >
          <Card variant="outlined" sx={{ background: "transparent", color: "white", boxShadow: "none" }}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Signup Heading */}
                <Box>
                  <Typography fontSize="2rem" color="#bcb8ff" fontWeight="bold" textAlign="center">
                    Signup
                  </Typography>
                </Box>

                {/* Name Input */}
                <Box mb={1.5}>
                  <Typography color="#fff" fontSize="1.2rem" mb={-1}>Name:</Typography>
                  <TextField
                    sx={style.input}
                    fullWidth
                    style={{ background: "white", color: "black", borderRadius: "10px" }}
                    type="text"
                    placeholder="Name"
                    label=""
                    {...register("name")}
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                  />
                </Box>

                {/* Email Input */}
                <Box mb={1.5}>
                  <Typography color="#fff" fontSize="1.2rem" mb={-1}>Email:</Typography>
                  <TextField
                    sx={style.input}
                    style={{ background: "white", color: "black", borderRadius: "10px" }}
                    fullWidth
                    type="text"
                    placeholder="Email"
                    label=""
                    {...register("email")}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                  />
                </Box>
                {/* Password Input */}
                <Box mb={1.5}>
                  <Typography color="#fff" fontSize="1.2rem" mb={-1}>Password:</Typography>
                  <PasswordInput
                    sx={style.input}
                    fullWidth
                    type="password"
                    placeholder="Password"
                    style={{ background: "white", color: "black", borderRadius: "10px" }}
                    label=""
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password")}
                  />
                </Box>

                {/* Confirm Password Input */}
                <Box mb={1.5}>
                  <Typography color="#fff" fontSize="1.2rem" mb={-1}>Confirm Password:</Typography>
                  <PasswordInput
                    sx={style.input}
                    fullWidth
                    style={{ background: "white", color: "black", borderRadius: "10px" }}
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    error={Boolean(errors.confirmPassword?.message)}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                  />
                </Box>
                {/* Signup Button */}
                <Button
                  type="submit"
                  sx={style.button}
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                >
                  Signup
                </Button>

                {/* Link to Login Page */}
                <Typography textAlign="center">
                  Already have an account?{" "}
                  <NavLink style={style.link as CSSProperties} to="/login">
                    Sign in
                  </NavLink>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}
