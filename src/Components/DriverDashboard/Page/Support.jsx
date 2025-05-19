import { useState, useRef, useEffect } from 'react'

const Support = () => {
  const [activeTab, setActiveTab] = useState('help')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: "Hello! I'm your support agent. How can I help you today?", time: "10:23 AM" },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const newMessage = {
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages([...chatMessages, newMessage])
    setMessage('')

    // make agent response after delay
    setIsTyping(true)
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me check that for you.",
        "Thanks for sharing those details. I'm looking into it now.",
        "That's a good question. Here's what I found...",
        "I'll need to escalate this to our specialist team.",
        "Can you provide more details about your issue?"
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setIsTyping(false)
    }, 1500)
  }

  const faqs = [
    {
      question: "How do I get paid for my rides?",
      answer: "Payments are processed weekly and deposited directly to your chosen bank account every Monday. You can also cash out your earnings instantly for a small fee using the 'Cash Out' option on the Earnings page."
    },
    {
      question: "What should I do if a passenger leaves an item in my car?",
      answer: "If a passenger leaves an item in your car, you can report it through the 'Report Lost Item' option in the Support tab. You'll be able to arrange a return with the passenger and may receive a fee for your time."
    },
    {
      question: "How do I report an issue with a rider?",
      answer: "To report an issue with a rider, go to your Ride History, select the specific ride, and tap on 'Report an Issue'. You can also contact Support directly through the Support tab."
    },
    {
      question: "What are the requirements to maintain my driver status?",
      answer: "To maintain your driver status, you need to maintain a minimum rating of 4.5 stars, keep an acceptance rate above 85%, and a cancellation rate below 5%. Regular vehicle inspections and updated documentation are also required."
    },
    {
      question: "How do I qualify for driver incentives and bonuses?",
      answer: "Driver incentives and bonuses are based on various factors including number of completed rides, time of day, and location. Check the Promotions section regularly for available incentives, which typically require meeting specific goals within a set timeframe."
    }
  ]

  const helpCategories = [
    {
      id: 'general',
      icon: <i className="fas fa-question-circle text-2xl text-green-400" />,
      title: "General Questions",
      description: "Answers to common driver questions",
      content: (
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg">General Questions</h3>
          <p className="dark:text-gray-300 text-gray-600">Here are some common questions we receive:</p>
          <ul className="list-disc pl-5 space-y-2 dark:text-gray-300 text-gray-600">
            <li>How do I update my profile information?</li>
            <li>What are the vehicle requirements?</li>
            <li>How do I change my availability schedule?</li>
          </ul>
          <button 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            onClick={() => setActiveTab('chat')}
          >
            Ask a Question
          </button>
        </div>
      )
    },
    {
      id: 'report',
      icon: <i className="fas fa-exclamation-circle text-2xl text-yellow-400" />,
      title: "Report an Issue",
      description: "Issues with rides or passengers",
      content: (
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg">Report an Issue</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer">
              <i className="fas fa-user-shield text-green-400" />
              <span className="dark:text-gray-300 text-gray-600">Report a safety concern</span>
            </div>
            <div className="flex items-center space-x-3 p-3 dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer">
              <i className="fas fa-car-crash text-yellow-400" />
              <span className="dark:text-gray-300 text-gray-600">Report an accident</span>
            </div>
            <div className="flex items-center space-x-3 p-3 dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer">
              <i className="fas fa-ban text-red-400" />
              <span className="dark:text-gray-300 text-gray-600">Report inappropriate behavior</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      icon: <i className="fas fa-credit-card text-2xl text-blue-400" />,
      title: "Payment Support",
      description: "Help with earnings and payouts",
      content: (
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg">Payment Support</h3>
          <div className="dark:bg-gray-800 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between mb-2 dark:text-gray-300 text-gray-600">
              <span>Last payout:</span>
              <span className="font-medium">$245.78</span>
            </div>
            <div className="flex justify-between mb-2 dark:text-gray-300 text-gray-600">
              <span>Next payout:</span>
              <span className="font-medium">$187.32 (pending)</span>
            </div>
            <div className="flex justify-between dark:text-gray-300 text-gray-600">
              <span>Payment method:</span>
              <span className="font-medium">•••• 4567</span>
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
            View Payment History
          </button>
        </div>
      )
    },
    {
      id: 'promotions',
      icon: <i className="fas fa-money-bill-wave text-2xl text-green-300" />,
      title: "Promotions & Incentives",
      description: "Questions about bonuses and incentives",
      content: (
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg">Current Promotions</h3>
          <div className="bg-gradient-to-r from-green-900/50 to-green-800/30 p-4 rounded-lg border border-green-800/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium dark:text-gray-200 text-gray-800">Weekend Warrior</span>
              <span className="bg-green-600 text-xs px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm mb-3 dark:text-gray-300 text-gray-600">Complete 20 rides between Fri-Sun to earn $100 bonus</p>
            <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-right mt-1 dark:text-gray-400 text-gray-500">9/20 rides completed</p>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
            View All Promotions
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="dark:bg-gray-950 bg-gray-50 min-h-screen p-4 md:p-8 dark:text-gray-100 text-gray-800">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Support Center</h1>
        <p className="dark:text-gray-400 text-gray-600">Get help with your account, rides, and payments</p>
      </div>
      
      <div className="flex border-b dark:border-gray-800 border-gray-300 mb-8 overflow-x-auto">
        <button 
          className={`pb-4 px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'help' 
              ? 'text-green-400 border-b-2 border-green-400' 
              : 'dark:text-gray-400 text-gray-600 hover:dark:text-gray-300 hover:text-gray-800'
          }`}
          onClick={() => {
            setActiveTab('help')
            setSelectedCategory(null)
          }}
        >
          Help Center
        </button>
        <button 
          className={`pb-4 px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'chat' 
              ? 'text-green-400 border-b-2 border-green-400' 
              : 'dark:text-gray-400 text-gray-600 hover:dark:text-gray-300 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          Chat Support
        </button>
        <button 
          className={`pb-4 px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'faq' 
              ? 'text-green-400 border-b-2 border-green-400' 
              : 'dark:text-gray-400 text-gray-600 hover:dark:text-gray-300 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('faq')}
        >
          FAQs
        </button>
      </div>
      
      {activeTab === 'help' && (
        <div className="space-y-8">
          {!selectedCategory ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="dark:bg-gray-200/10 bg-white rounded-xl p-6 flex items-start space-x-4 dark:hover:bg-gray-200/15 hover:bg-gray-50 transition-all cursor-pointer dark:border-gray-800 border-gray-200 hover:border-green-800/50 hover:shadow-lg hover:shadow-green-900/10"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="mt-1">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-start dark:text-gray-200 text-gray-800">{category.title}</h3>
                      <p className="dark:text-gray-400 text-gray-600">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 dark:border-gray-800 border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Contact Support Team</h2>
                <p className="dark:text-gray-400 text-gray-600 mb-6">
                  Our support team is available 24/7 to help with any issues you may encounter.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-5 dark:bg-gray-900 bg-gray-100 rounded-lg dark:border-gray-800 border-gray-200 hover:border-green-800 transition-colors">
                    <div className="bg-green-900/50 p-3 rounded-full">
                      <i className="fas fa-headset text-xl text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-start dark:text-gray-200 text-gray-800">Phone Support</h3>
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-2 text-start">Available 24/7</p>
                      <p className="text-green-400 font-mono">+1 (888) 555-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-5 dark:bg-gray-900 bg-gray-100 rounded-lg dark:border-gray-800 border-gray-200 hover:border-green-800 transition-colors">
                    <div className="bg-blue-900/50 p-3 rounded-full">
                      <i className="fas fa-comment-alt text-xl text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-start dark:text-gray-200 text-gray-800">Email Support</h3>
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-2 text-start">Response within 24 hours</p>
                      <p className="text-green-400 font-mono">support@greenride.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200">
              <div className="p-4 dark:border-b dark:border-gray-800 border-b-gray-300 flex items-center dark:bg-gray-900 bg-gray-100 rounded-t-xl">
                <button 
                  className="mr-4 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800"
                  onClick={() => setSelectedCategory(null)}
                >
                  <i className="fas fa-arrow-left" />
                </button>
                <h2 className="text-lg font-semibold dark:text-gray-200 text-gray-800">
                  {helpCategories.find(c => c.id === selectedCategory)?.title}
                </h2>
              </div>
              <div className="p-4">
                {helpCategories.find(c => c.id === selectedCategory)?.content}
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'chat' && (
        <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 flex flex-col h-[70vh]">
          <div className="p-4 dark:border-b dark:border-gray-800 border-b-gray-300 flex items-center dark:bg-gray-900 bg-gray-100 rounded-t-xl">
            <div className="bg-green-900/50 p-2 rounded-full mr-3">
              <i className="fas fa-headset text-green-400" />
            </div>
            <div>
              <h3 className="font-medium dark:text-gray-200 text-gray-800">Support Agent</h3>
              <p className="text-xs dark:text-gray-400 text-gray-600">
                {isTyping ? 'Typing...' : 'Typically replies in a few minutes'}
              </p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 dark:bg-gray-900/30 bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`
                    ${msg.sender === 'user' 
                      ? 'dark:bg-green-900/50 bg-green-100 dark:text-green-100 text-green-900 rounded-2xl rounded-tr-none' 
                      : 'dark:bg-gray-800 bg-gray-200 rounded-2xl rounded-tl-none'
                    } p-4
                  `}>
                    <p>{msg.text}</p>
                  </div>
                  <span className={`text-xs dark:text-gray-400 text-gray-500 mt-1 block ${msg.sender === 'user' ? 'pr-2' : 'pl-2'}`}>
                    {msg.sender === 'user' ? 'You' : 'Support Agent'} • {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[75%]">
                  <div className="dark:bg-gray-800 bg-gray-200 rounded-2xl rounded-tl-none p-4 w-32">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 dark:bg-gray-400 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 dark:bg-gray-400 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 dark:bg-gray-400 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 dark:border-t dark:border-gray-800 border-t-gray-300 dark:bg-gray-900 bg-gray-100 rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-900/50"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg transition-colors flex items-center justify-center disabled:dark:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {activeTab === 'faq' && (
        <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 dark:border-gray-800 border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">Frequently Asked Questions</h2>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search FAQs..."
                className="dark:bg-gray-900 bg-gray-100 dark:border-gray-800 border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-900/50 focus:border-green-500 w-full"
              />
              <i className="fas fa-search absolute left-3 top-3 dark:text-gray-400 text-gray-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="dark:border-gray-800 border-gray-300 rounded-lg overflow-hidden dark:bg-gray-900/30 bg-gray-50 transition-all duration-200"
                style={{
                  boxShadow: expandedFaq === index ? '0 4px 6px -1px rgba(0, 255, 128, 0.1)' : 'none'
                }}
              >
                <div 
                  className="flex justify-between items-center p-5 cursor-pointer dark:hover:bg-gray-800/50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-medium text-lg dark:text-gray-200 text-gray-800">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <i className="fas fa-chevron-up text-green-400 transition-transform" />
                  ) : (
                    <i className="fas fa-chevron-down dark:text-gray-400 text-gray-500 transition-transform" />
                  )}
                </div>
                
                {expandedFaq === index && (
                  <div className="p-5 pt-0 animate-fadeIn">
                    <p className="dark:text-gray-300 text-gray-600 pl-1">{faq.answer}</p>
                    <button 
                      className="mt-4 text-green-400 text-sm font-medium flex items-center"
                      onClick={() => {
                        setActiveTab('chat')
                        setMessage(`I have a question about: ${faq.question}`)
                      }}
                    >
                      <i className="fas fa-comment-dots mr-2" />
                      Still need help? Chat with us
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-5 dark:bg-green-900/20 bg-green-100 dark:border-green-800/50 border-green-200 rounded-lg dark:hover:bg-green-900/30 hover:bg-green-50 transition-colors">
            <div className="flex items-start space-x-4">
              <i className="fas fa-question-circle text-green-400 text-xl mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-2 dark:text-gray-200 text-gray-800">Can't find what you're looking for?</h3>
                <p className="dark:text-gray-400 text-gray-600 mb-4">
                  Our support team is available 24/7 to answer your questions.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors text-sm font-medium"
                    onClick={() => setActiveTab('chat')}
                  >
                    <i className="fas fa-comment-alt mr-2" />
                    Chat with Support
                  </button>
                  <button className="border dark:border-gray-600 border-gray-300 hover:dark:border-gray-500 hover:border-gray-400 dark:text-gray-300 text-gray-700 hover:dark:text-white hover:text-gray-800 px-5 py-2 rounded-lg transition-colors text-sm font-medium">
                    <i className="fas fa-phone-alt mr-2" />
                    Call Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Support