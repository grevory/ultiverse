"use client"

import { useEffect } from 'react'
import Link from "next/link";
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { useUser } from '@/contexts/userContext'

// @mui material components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function RegisterPage () {
    const { loadingUser, user } = useUser()

    const profile = { username: 'greg', message: 'Awesome!!' }

    useEffect(() => {
        if (!loadingUser) {
          // You know that the user is loaded: either logged in or out!
          console.log("User Loaded", user)
        }
        // You also have your firebase app initialized
      }, [loadingUser, user])

      const createUser = async () => {
        const db = getFirestore()
        await setDoc(doc(db, 'profile', profile.username), profile)

        alert('User created!!')
      }

    return (
        <main>
          <Container>
            <Box>
              <Card>
                <Typography variant="h2">Hello {user ? (user?.displayName || user?.email) : "World"}</Typography>
              </Card>
            </Box>
          </Container>
        </main>
    );
}