"use client"

import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useUser } from '@/contexts/userContext'

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
        <h2>Hello {user ? (user?.displayName || user?.email) : "World"}</h2>
    );
}