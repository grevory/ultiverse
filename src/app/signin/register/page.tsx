"use client"

import { ReactNode, useEffect, useState } from 'react'
import Link from "next/link";
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useUser } from '@/contexts/UserContext'

// @mui material components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AlertColor } from '@mui/material';

import Notification from '@/components/Notification/Notification.component';
import { auth } from '@/lib/firebase/firebase';
import { FIREBASE_ERROR_MESSAGE } from '@/lib/firebase/errors.constants';

const getFirebaseError = (errorMessage: string): string => FIREBASE_ERROR_MESSAGE[errorMessage.substring(
    errorMessage.indexOf("(") + 1,
    errorMessage.lastIndexOf(")")
)] || errorMessage;

interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    providerId?: string;
}

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string>("")
    const [messageSeverity, setMessageSeverity] = useState<AlertColor>();
    const [messageAction, setMessageAction] = useState<ReactNode>()
    const { loadingUser, user } = useUser()

    function handleSubmit(event: React.SyntheticEvent) {

        setMessageSeverity(undefined)
        setMessageAction(undefined);
        setMessage("")
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                console.log(111, authUser);
                let { uid, email, providerId, displayName, photoURL, phoneNumber } = authUser.user;
                createUser({
                    uid,
                    email: email || "",
                    providerId,
                    displayName: displayName || "",
                    photoURL: photoURL || "",
                    phoneNumber: phoneNumber || "",
                })
                console.log("Success. The user is created in Firebase", authUser)
                setMessage("Success. The user is created in Firebase")
                setMessageSeverity("success");
                // router.push("/logged_in");
            })
            .catch(error => {
                // An error occurred. Set error message to be displayed to user
                setMessage(getFirebaseError(error.message))
                setMessageSeverity("error");
            });
        event.preventDefault();
        console.log(firstName, lastName, email, password)
    }

    useEffect(() => {
        if (!loadingUser) {
            // You know that the user is loaded: either logged in or out!
            console.log("User Loaded", user)
            setMessage(`You are already logged in as ${user?.email}`);
            setMessageSeverity("warning");
            setMessageAction(<Button>Logout</Button>);
        }
        // You also have your firebase app initialized
    }, [loadingUser, user])

    const createUser = async (profile: User) => {
        const db = getFirestore();
        await setDoc(doc(db, 'profile', profile.email), profile)
    }

    return (
        <Container>
            <Box>
                <h2>Register Form</h2>
                <Typography variant="h3">Hello {user ? (user?.displayName || user?.email) : "World"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='filled'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant='filled'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        />
                    </Stack>
                    <TextField
                        type="email"
                        variant='filled'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="password"
                        variant='filled'
                        color='secondary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <Button variant="contained" color="secondary" type="submit">Register</Button>
                </form>
                <p><small>Already have an account? <Link href="/login">Login Here</Link></small></p>
            </Box>
            {message && <Notification message={message} severity={messageSeverity} action={messageAction} />}
        </Container>
    );
}