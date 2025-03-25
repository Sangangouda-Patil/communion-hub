"use client"
import React from 'react'
import { motion } from "framer-motion"
import Image from "next/image"

interface MeetOurTeamProps {
  isLoaded: boolean;
}

const MeetOurTeam: React.FC<MeetOurTeamProps> = ({ isLoaded }) => {
  const teamMembers = [
    {
      name: "Amira L",
      role: "Jewish Community",
      image: "/images/aboutpage/aboutpage-section-round-img1.png",
    },
    {
      name: "Rohan K",
      role: "Hindu Community",
      image: "/images/aboutpage/aboutpage-section-round-img2.png",
    },
    {
      name: "Imam El-Masri",
      role: "Muslim Community",
      image: "/images/aboutpage/aboutpage-section-round-img3.png",
    },
    {
      name: "Pastor Jon",
      role: "Christian Community",
      image: "/images/aboutpage/aboutpage-section-round-img4.png",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5, // Delay to start after hero section
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="w-full py-12 sm:py-16 md:py-24 bg-[#e8f4f1]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Heading */}
          <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Meet Our Social <span className="text-[#4CAF93]">Expert Team</span>
            </h2>
          </motion.div>

          {/* Team Members */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div key={index} className="text-center group" variants={itemVariants} custom={index}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4 transform transition-transform duration-300 ease-out group-hover:scale-110">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg transition-colors duration-300 group-hover:text-[#4CAF93]">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetOurTeam

