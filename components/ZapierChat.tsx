"use client"
import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './ZapierChat.module.css'

export default function ZapierChat() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [dimensions, setDimensions] = useState(() => ({
    chatWidth: '400px',
    chatHeight: '600px',
    chatRight: '20px',
    chatBottom: '20px',
    buttonSize: '50px',
    buttonRight: '20px',
    buttonBottom: '20px',
    isMobile: false
  }))
  
  // Ref to track if chat is currently open
  const chatOpenRef = useRef(false)
  
  // Update dimensions based on window size, but ignore height changes when chat is open on mobile
  const updateDimensions = useCallback(() => {
    // Only update dimensions if chat is closed or if this is not a height-only change
    const width = window.innerWidth
    const isMobileView = width < 480
    
    if (!chatOpenRef.current || !isMobileView) {
      if (isMobileView) { // Mobile
        setDimensions({
          chatWidth: '100%',
          chatHeight: '100%',
          chatRight: '0',
          chatBottom: '0',
          buttonSize: '40px',
          buttonRight: '10px',
          buttonBottom: '10px',
          isMobile: true
        })
      } else if (width < 768) { // Tablet
        setDimensions({
          chatWidth: '85vw',
          chatHeight: '600px',
          chatRight: '20px',
          chatBottom: '20px',
          buttonSize: '45px',
          buttonRight: '15px',
          buttonBottom: '15px',
          isMobile: false
        })
      } else { // Desktop
        setDimensions({
          chatWidth: '400px',
          chatHeight: '600px',
          chatRight: '20px',
          chatBottom: '20px',
          buttonSize: '50px',
          buttonRight: '20px',
          buttonBottom: '20px',
          isMobile: false
        })
      }
    }
  }, [])

  // Load Zapier script with preconnect for faster loading
  useEffect(() => {
    if (!isScriptLoaded) {
      // Add preconnect for faster loading
      const preconnect = document.createElement('link')
      preconnect.rel = 'preconnect'
      preconnect.href = 'https://interfaces.zapier.com'
      document.head.appendChild(preconnect)
      
      const script = document.createElement('script')
      script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'
      script.async = true
      script.type = 'module'
      script.onload = () => setIsScriptLoaded(true)
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
        if (document.head.contains(preconnect)) {
          document.head.removeChild(preconnect)
        }
      }
    }
  }, [])

  // Initialize dimensions on mount and handle resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateDimensions()
      
      // Use a debounced resize handler to avoid excessive updates
      let resizeTimer: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          // Only update if chat is closed or if width changed
          const newWidth = window.innerWidth
          if (!chatOpenRef.current || newWidth !== window.innerWidth) {
            updateDimensions()
          }
        }, 100)
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(resizeTimer)
      }
    }
  }, [updateDimensions])

  // Update meta viewport when chat is opened/closed on mobile
  useEffect(() => {
    chatOpenRef.current = isVisible
    
    if (dimensions.isMobile) {
      if (isVisible) {
        // When opening chat on mobile, fix the viewport
        const meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.id = 'chat-viewport-meta'
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        document.head.appendChild(meta)
        
        // Prevent scrolling and bouncing effects on iOS
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
        document.body.style.overflow = 'hidden'
      } else {
        // When closing, restore normal viewport
        const meta = document.getElementById('chat-viewport-meta')
        if (meta) {
          document.head.removeChild(meta)
        }
        
        // Restore scrolling
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.overflow = ''
      }
    }
  }, [isVisible, dimensions.isMobile])

  useEffect(() => {
    // Create chat icon button when chat is hidden
    if (!isVisible) {
      const chatButton = document.createElement('button')
      chatButton.id = 'chat-icon-button'
      chatButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
        </svg>
      `
      chatButton.style.position = 'fixed'
      chatButton.style.right = dimensions.buttonRight
      chatButton.style.bottom = dimensions.buttonBottom
      chatButton.style.width = dimensions.buttonSize
      chatButton.style.height = dimensions.buttonSize
      chatButton.style.borderRadius = '50%'
      chatButton.style.backgroundColor = '#42b292'
      chatButton.style.color = '#ffffff'
      chatButton.style.border = 'none'
      chatButton.style.cursor = 'pointer'
      chatButton.style.display = 'flex'
      chatButton.style.alignItems = 'center'
      chatButton.style.justifyContent = 'center'
      chatButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'
      chatButton.style.zIndex = '9999'
      chatButton.style.transition = 'all 0.3s ease'
      
      chatButton.onclick = () => setIsVisible(true)
      document.body.appendChild(chatButton)

      return () => {
        if (document.body.contains(chatButton)) {
          document.body.removeChild(chatButton)
        }
      }
    }

    // Create chat container when visible
    if (isVisible && isScriptLoaded) {
      const chatContainer = document.createElement('div')
      chatContainer.id = 'zapier-chat-container'
      chatContainer.style.position = 'fixed'
      chatContainer.style.zIndex = '9999'
      chatContainer.style.transition = 'all 0.3s ease'
      
      if (dimensions.isMobile) {
        chatContainer.style.position = 'fixed'
        chatContainer.style.top = '0'
        chatContainer.style.left = '0'
        chatContainer.style.right = '0'
        chatContainer.style.bottom = '0'
        chatContainer.style.width = '100%'
        chatContainer.style.height = '100%'
        chatContainer.style.margin = '0'
        chatContainer.style.padding = '0'
        chatContainer.style.overflowY = 'hidden'
      } else {
        chatContainer.style.right = dimensions.chatRight
        chatContainer.style.bottom = dimensions.chatBottom
        chatContainer.style.width = dimensions.chatWidth
        chatContainer.style.height = dimensions.chatHeight
      }
      
      const chatbotElement = document.createElement('zapier-interfaces-chatbot-embed')
      chatbotElement.setAttribute('is-popup', 'false')
      chatbotElement.setAttribute('chatbot-id', 'cm8ndpwuc0008ahfwntv221wb')
      
      if (dimensions.isMobile) {
        const style = chatbotElement.style as any;
        style.width = '100%';
        style.height = '100%';
        style.position = 'fixed';
        style.top = '0';
        style.left = '0';
        style.overflowY = 'auto';
        style.webkitOverflowScrolling = 'touch';
      }
      
      chatbotElement.setAttribute('primary-color', '#42b292')
      chatbotElement.setAttribute('text-color', '#1f2937')
      chatbotElement.setAttribute('background-color', '#ffffff')
      
      const closeButton = document.createElement('button')
      closeButton.innerHTML = '✕'
      closeButton.style.position = 'absolute'
      
      // Different close button styling for mobile
      if (dimensions.isMobile) {
        closeButton.style.top = '20px'
        closeButton.style.right = '20px'
        closeButton.style.fontSize = '28px'
        closeButton.style.padding = '15px'
        closeButton.style.width = '50px'
        closeButton.style.height = '50px'
      } else {
        closeButton.style.top = '10px'
        closeButton.style.right = '10px'
        closeButton.style.fontSize = '20px'
        closeButton.style.padding = '5px'
      }
      
      closeButton.style.zIndex = '10001' // Higher than chatContainer
      closeButton.style.background = 'transparent'
      closeButton.style.color = '#666666'
      closeButton.style.border = 'none'
      closeButton.style.cursor = 'pointer'
      closeButton.style.fontWeight = 'bold'
      closeButton.style.lineHeight = '1'
      closeButton.style.transition = 'color 0.2s ease'
      closeButton.style.display = 'flex'
      closeButton.style.alignItems = 'center'
      closeButton.style.justifyContent = 'center'
      
      closeButton.onmouseover = () => {
        closeButton.style.color = '#000000'
      }
      closeButton.onmouseout = () => {
        closeButton.style.color = '#666666'
      }
      
      closeButton.onclick = () => {
        setIsVisible(false)
      }
      
      chatContainer.appendChild(chatbotElement)
      chatContainer.appendChild(closeButton)
      document.body.appendChild(chatContainer)

      // Add these event listeners to prevent scrolling on the body
      const preventScroll = (e: TouchEvent) => {
        // Allow scrolling inside the chat element but prevent it on the body
        if (!chatbotElement.contains(e.target as Node)) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        if (document.body.contains(chatContainer)) {
          document.body.removeChild(chatContainer);
        }
        document.removeEventListener('touchmove', preventScroll);
      }
    }
  }, [isVisible, dimensions, isScriptLoaded])

  return null
} 