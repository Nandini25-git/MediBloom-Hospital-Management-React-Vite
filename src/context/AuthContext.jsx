import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const DEMO_EMAIL = 'admin@medibloom.com'
const DEMO_PASSWORD = 'medibloom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('medibloom-user', null)

  const login = (email, password) => {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUser({ name: 'Dr. Aria Bloom', email: DEMO_EMAIL, role: 'Administrator' })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  const updateProfile = (updates) => setUser((current) => ({ ...current, ...updates }))

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
