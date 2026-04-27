'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChatStore, Message } from '@/lib/store'
import { chatAPI } from '@/lib/api'
import { Send, Loader } from 'lucide-react'

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentSession, addMessage, isLoading } = useChatStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !currentSession || isStreaming) return

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    addMessage(userMessage)
    setInput('')
    setIsStreaming(true)

    try {
      // Stream response
      const stream = await chatAPI.sendMessage({
        session_id: currentSession.id,
        user_id: 'user_123', // TODO: Get from auth
        message: input,
        topic: currentSession.topic,
        difficulty: currentSession.difficulty,
      })

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      let assistantMessage: Message | null = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        assistantContent += chunk

        if (!assistantMessage) {
          assistantMessage = {
            id: `msg_${Date.now()}_assistant`,
            role: 'assistant',
            content: assistantContent,
            timestamp: new Date(),
          }
          addMessage(assistantMessage)
        } else {
          // Update the last message
          if (currentSession.messages.length > 0) {
            const lastMsg = currentSession.messages[currentSession.messages.length - 1]
            if (lastMsg.role === 'assistant') {
              lastMsg.content = assistantContent
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsStreaming(false)
    }
  }

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select or create a chat session to begin</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentSession.messages.map((message) => (
          <div
            key={message.id}
            className={`message-enter flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t p-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          disabled={isStreaming}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
