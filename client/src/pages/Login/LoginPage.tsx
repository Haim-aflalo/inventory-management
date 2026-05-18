import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../../api/apiClient';
import type { LoginForm } from './loginTypes.js';
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
import { loginStyle } from './loginStyle.js';

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
    <Container component="main" maxWidth="xs" sx={loginStyle.containerSx}>
      <Paper sx={loginStyle.paperSx}>
        <Box sx={loginStyle.boxSx}>
          <Typography component="h1" variant="h5" sx={loginStyle.typographySx}>
            Login
          </Typography>

          {loginError && (
            <Alert severity="error" sx={loginStyle.loginErrorSx}>
              {loginError}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(handleAuthSubmit)}
            noValidate
            sx={loginStyle.boxFormSx}
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
              sx={loginStyle.submitBtnSx}
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

//revoir l'architecture du style
//utiliser mui a la place du css
//refaire tout le css avec mui
//refactor pour arrow functions
//envoyer les api et url en env
//revoir les namig en precis max
//revoir bien ls jwt
//no ANY
//voir les bibliotheque pour un surplus de states
//revoir comment faire pour faire sans preventdefault
//check responsive
//apprendre bien rem
//aprendre les variables COMME IL FAUT en css
