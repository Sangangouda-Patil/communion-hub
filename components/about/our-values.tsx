"use client"
import { motion } from "framer-motion"
import { Heart, Users, Globe, MessageCircle, Lightbulb, Handshake } from "lucide-react"

export default function OurValues() {
  const values = [
    {
      icon: <Heart className="text-[#4EB89D]" size={20} />,
      title: "Compassion",
      description:
        "We approach every interaction with empathy, kindness, and a genuine desire to understand others' experiences.",
    },
    {
      icon: <Users className="text-[#4EB89D]" size={20} />,
      title: "Inclusivity",
      description:
        "We create spaces where everyone feels welcome, valued, and able to participate fully regardless of background.",
    },
    {
      icon: <MessageCircle className="text-[#4EB89D]" size={20} />,
      title: "Dialogue",
      description: "We foster open, honest conversations where diverse perspectives are shared and respected.",
    },
    {
      icon: <Globe className="text-[#4EB89D]" size={20} />,
      title: "Respect",
      description:
        "We honor the dignity, traditions, and beliefs of all people, recognizing the value in our differences.",
    },
    {
      icon: <Lightbulb className="text-[#4EB89D]" size={20} />,
      title: "Learning",
      description:
        "We approach each interaction as an opportunity to grow, challenge assumptions, and expand our understanding.",
    },
    {
      icon: <Handshake className="text-[#4EB89D]" size={20} />,
      title: "Collaboration",
      description:
        "We believe in the power of working together across boundaries to create positive change in our communities.",
    },
  ]

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-[#4CAF93]">Principles</span> That Guide Our Work
            </h2>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#E0F2ED] flex items-center justify-center mb-3 sm:mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

