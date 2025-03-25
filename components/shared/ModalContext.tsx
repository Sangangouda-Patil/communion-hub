"use client"
import { createContext, useContext, useState } from 'react'
import SignupModal from './signup-modal'

type ModalContextType = {
  isSignupOpen: boolean
  openSignup: () => void
  closeSignup: () => void
  openLogin: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const openSignup = () => setIsSignupOpen(true)
  const closeSignup = () => setIsSignupOpen(false)
  const openLogin = () => {
    setIsSignupOpen(false)
    setIsLoginOpen(true)
  }

  return (
    <ModalContext.Provider value={{ isSignupOpen, openSignup, closeSignup, openLogin }}>
      {children}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={closeSignup}
        onSwitchToLogin={openLogin}
      />
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a ModalProvider')
  return context
} 