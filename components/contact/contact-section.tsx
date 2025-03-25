"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Send, Mail, Phone, ArrowRight, CheckCircle, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function ContactSection({ isLoaded = false }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3, // Start after hero is visible
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="w-full py-8 md:py-16 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Modern layout with proper spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 lg:p-10 h-fit"
              variants={itemVariants}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Contact Details</h2>

              <div className="space-y-6 md:space-y-8">
                <ContactItem
                  icon={<Mail className="text-[#4CAF93]" />}
                  title="Email Us"
                  content={
                    <a
                      href="mailto:contact@communionhub.org"
                      className="text-gray-600 hover:text-[#4CAF93] transition-colors group"
                    >
                      contact@communionhub.org
                      {/* <ArrowRight size={14} className="inline ml-1 transition-transform group-hover:translate-x-1" /> */}
                    </a>
                  }
                />

                <ContactItem
                  icon={<Phone className="text-[#4CAF93]" />}
                  title="Call Us"
                  content={
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-[#4CAF93] transition-colors group">
                      +91 8254682036
                      {/* <ArrowRight size={14} className="inline ml-1 transition-transform group-hover:translate-x-1" /> */}
                    </a>
                  }
                />
              </div>

              {/* Social Media Icons */}
              <div className="mt-8 pt-6 md:mt-10 md:pt-8 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-4">CONNECT WITH US</h3>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E0F2ED] flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} className="text-gray-600 hover:text-[#4CAF93]" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E0F2ED] flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className="text-gray-600 hover:text-[#4CAF93]" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E0F2ED] flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} className="text-gray-600 hover:text-[#4CAF93]" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E0F2ED] flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="text-gray-600 hover:text-[#4CAF93]" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Card - Takes up 2 columns */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 lg:p-10 lg:col-span-2"
              variants={itemVariants}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Get in Touch Section */}
          <motion.div className="mt-16 rounded-3xl overflow-hidden" variants={itemVariants}>
            <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-100/80 backdrop-blur-sm relative">
              {/* This would be replaced with an actual map integration */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#E0F2ED]/30">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <Mail size={24} className="text-[#4CAF93]" />
                  </div>
                  <h3 className="text-xl font-bold">Get In Touch</h3>
                  <p className="text-gray-600 mt-2">We'd love to hear from you!</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-white/80 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Ready to connect?</h3>
                  <p className="text-gray-600">Reach out today and let's start a conversation</p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#E0F2ED] text-[#4CAF93] rounded-full hover:bg-[#d0ebe3] transition-colors"
                  >
                    <Phone size={18} />
                    <span className="hidden sm:inline">Call Us</span>
                    <span className="sm:hidden">Call</span>
                  </a>
                  <a
                    href="mailto:contact@communionhub.org"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#4CAF93] text-white rounded-full hover:bg-[#3d9c82] transition-colors"
                  >
                    <Mail size={18} />
                    <span className="hidden sm:inline">Email Us</span>
                    <span className="sm:hidden">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setError("There was an error submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Send us a message</h2>
        <p className="text-gray-600 mt-2">We'd love to hear from you</p>
      </div>

      {isSubmitted ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E0F2ED] mb-6">
            <CheckCircle size={40} className="text-[#4CAF93]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for reaching out. We've received your message and will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4CAF93] text-white rounded-full hover:bg-[#3d9c82] transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent transition-colors"
              placeholder="How can we help you?"
            />
          </div>

          <div className="mb-8 space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent transition-colors resize-none"
              placeholder="Tell us what you'd like to know or share..."
            />
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500">We'll get back to you within 24-48 hours</p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 bg-[#4EB89D] hover:bg-[#3da78c] text-white font-medium px-8 py-3 rounded-full transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  )
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: React.ReactNode | string
}) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0F2ED] flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="text-gray-600 mt-1">{content}</div>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

