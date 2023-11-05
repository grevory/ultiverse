import { useState, useEffect, createContext, useContext } from 'react'
import { createFirebaseApp } from "@/lib/firebase/clientApp"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { UserInfo } from 'firebase/auth'

export interface UserContextInterface {
    user?: UserInfo | null;
    setUser?: (user: UserInfo | null) => void;
    loadingUser?: boolean;
}

// export type UserContextType = User | {} | ((user: User | {}) => void) | boolean;

export const UserContext = createContext<UserContextInterface>({})

export default function UserContextComp({ children } : { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const app = createFirebaseApp()
    const auth = getAuth(app)
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, phoneNumber, providerId, photoURL } = user
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, phoneNumber: phoneNumber || null, providerId: providerId || "", photoURL })
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext) as UserContextInterface