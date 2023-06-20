'use client';

import { useRouter } from 'next/navigation';

import { Box, Button, TextField } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { StartingHeader } from '@/components/StartingHeader/StartingHeader';

import css from './page.module.css';

interface Data {
  id: number;
  refreshToken: string;
}

export default function LoginForm(): JSX.Element {
  const router = useRouter();

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(4, 'Invalid password').matches(/[a-zA-Z-0-9]/, 'Password can only contain Latin letters.'),
  });

  const handleSubmit = async (values: typeof initialValues, actions: any): Promise<void> => {
    const API_URL = process.env.API_URL;
    const login: string = values.login;
    const password: string = values.password;
    try {
      const response: Response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      const data = await response.json();

      const {id, refreshToken}: Data = data;
      
      if (response.status === 200) {
        localStorage.setItem('user_id', JSON.stringify(id));
        localStorage.setItem('refresh_token', JSON.stringify(refreshToken));        
        router.push('/home/to_do_list');
        actions.setSubmitting(false);
      }
    } catch (e) {
      actions.setSubmitting(false);
      return console.log('An error has occurred', e);
    }
  };

  const handleKeyDown = async (values: typeof initialValues, actions: any, event: any): Promise<void> => {
    if (event.key === 'Enter') {
      const API_URL = process.env.API_URL;
      const login: string = values.login;
      const password: string = values.password;
      try {
        const response: Response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({login, password})
        });
        const data = await response.json();

        const {id, refreshToken}: Data = data;
        
        if (response.status === 200) {
          localStorage.setItem('user_id', JSON.stringify(id));
          localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
          router.push('/home/to_do_list');
          actions.setSubmitting(false);
        }
      } catch (e) {
        actions.setSubmitting(false);
        return console.log('An error has occurred', e);
      }
    }
  };

  return (
    <Box>
      <StartingHeader />
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <Form className={css.form} >
          <Box 
            sx={{
              color: 'text.primary',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            Log in
          </Box>
          <Box>
            <Field 
              type='text' 
              name='login'
              id='login' 
              placeholder='Email' 
              as={TextField} 
              variant='outlined'
              size='small'
              sx={{
                margin: '20px 0 10px 0'
              }} 
            />
            <ErrorMessage 
              name='login'
              component='div' 
              className={css.error} 
            />
          </Box>
          <Box>
            <Field 
              type='password' 
              name='password'
              id='password'
              placeholder='Password' 
              as={TextField} 
              variant='outlined'
              size='small' 
            />
            <ErrorMessage 
              name='password' 
              component='div' 
              className={css.error2} 
            />
          </Box>
          <Button 
            id='button_login'
            type='submit' 
            variant='contained' 
            size='small' 
            sx={{ 
              margin: '10px 0' 
            }}
          >
            <Login 
              sx={{ 
                paddingRight: '3px' 
              }} 
            />
            Log in
          </Button>
          <Button 
            id='registration_button'
            variant='contained' 
            size='small'
            onClick={() => router.push('/registration')}
          >
            <PersonAdd 
              sx={{
                paddingRight: '3px'
              }}
            />
            Sign up
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};