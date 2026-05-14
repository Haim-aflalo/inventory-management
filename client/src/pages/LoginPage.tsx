import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../api/apiClient';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';

import { Visibility, VisibilityOff, Login } from '@mui/icons-material';

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const handleAuthSubmit = async (data: LoginForm) => {
    try {
      setLoginError(null);
      const authResponse = await apiClient.post('/users/login', data);
      if (authResponse.status === 200) {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : 'An error occurred';
      console.error(errorMsg);
      setLoginError('username or password missing are incorect');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: (theme) => theme.spacing(20),
      }}
    >
      <Paper
        elevation={3}
        sx={{
          marginTop: (theme) => theme.spacing(8),
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            Login
          </Typography>
          {loginError && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(handleAuthSubmit)}
            noValidate
            sx={{ width: '100%' }}
          >
            <TextField
              {...register('username', {
                required: 'username is required',
              })}
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              {...register('password', {
                required: 'password is required',
              })}
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              startIcon={<Login />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              {isSubmitting ? 'Connexion...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

//check responsive
//apprendre bien rem
//aprendre les variables COMME IL FAUT en css
