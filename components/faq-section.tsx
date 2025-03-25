"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"

export default function FaqSection({ isLoaded = false }) {
  const faqs = [
    {
      question: "What types of events does CommunionHub organize?",
      answer:
        "CommunionHub organizes a diverse range of events including interfaith dialogues, community service projects, cultural celebrations, educational workshops, and spiritual retreats. Our events are designed to foster connection, understanding, and collaboration across different faith traditions and cultural backgrounds.",
    },
    {
      question: "Are all the events paid?",
      answer:
        "No, not all events are paid. We offer a mix of free and paid events. Community gatherings and some workshops are often free to attend, while specialized workshops, retreats, and certain premium events may have a registration fee to cover costs. We strive to keep our events accessible and offer scholarships when possible.",
    },
    {
      question: "How do you ensure the quality of your events?",
      answer:
        "We ensure quality through careful selection of experienced facilitators, thorough planning, and post-event evaluations. Our team works closely with community leaders and subject matter experts to create meaningful content. We also collect feedback from participants after each event to continuously improve our offerings.",
    },
    {
      question: "How can I register myself?",
      answer:
        "Registration is simple! Browse our events page, select the event you're interested in, and click the 'Register Now' button. You'll be guided through a straightforward registration process where you can provide necessary information and, if applicable, complete any payment. You'll receive a confirmation email with all the details once registered.",
    },
    {
      question: "Are events virtual or in-person?",
      answer:
        "We offer both virtual and in-person events to accommodate different preferences and circumstances. Our calendar clearly indicates the format of each event. Many of our events also follow a hybrid model, allowing participants to join either in person or online for maximum accessibility.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Our standard cancellation policy allows for full refunds if cancelled at least 7 days before the event. Cancellations made 3-7 days prior receive a 50% refund. For cancellations less than 3 days before the event, we offer credit toward future events. Some special events may have different policies, which will be clearly stated on the event page.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.0, // Start after discover us section
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
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Heading */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="text-[#4CAF93]">Questions?</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg">Get the Answers You Need to Make the Right Move</p>
          </motion.div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} custom={index}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <button
        className="w-full p-4 sm:p-6 flex justify-between items-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-gray-800 text-sm sm:text-base pr-3 text-left group-hover:text-[#4CAF93] transition-colors">
          {question}
        </h3>
        <div
          className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
            isOpen ? "bg-gray-100" : "bg-[#E0F2ED]"
          } flex items-center justify-center transition-all duration-300 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <X size={14} className="text-gray-500 transition-transform duration-300" />
          ) : (
            <Plus size={14} className="text-[#4CAF93] transition-transform duration-300" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98]
                },
                opacity: { 
                  duration: 0.25,
                  delay: 0.15 
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98]
                },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm sm:text-base"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

