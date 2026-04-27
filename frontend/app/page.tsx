'use client'

import React, { useState, useEffect } from 'react'
import { useChatStore, ChatSession, Message } from '@/lib/store'
import ChatInterface from '@/components/ChatInterface'
import ProgressDashboard from '@/components/ProgressDashboard'
import QuizInterface from '@/components/QuizInterface'
import { BookOpen, BarChart3, HelpCircle, Plus } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

type TabType = 'chat' | 'quiz' | 'progress'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('chat')
  const { currentSession, setCurrentSession } = useChatStore()

  useEffect(() => {
    // Create initial session
    if (!currentSession) {
      const newSession: ChatSession = {
        id: `session_${uuidv4()}`,
        topic: 'grammar',
        difficulty: 'A2',
        messages: [],
      }
      setCurrentSession(newSession)
    }
  }, [currentSession, setCurrentSession])

  const createNewSession = (topic: string, difficulty: string) => {
    const newSession: ChatSession = {
      id: `session_${uuidv4()}`,
      topic,
      difficulty,
      messages: [],
    }
    setCurrentSession(newSession)
    setActiveTab('chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Italian Language AI Tutor</h1>
          </div>
          <p className="text-sm text-gray-600">Prefettura di Milano Exam Preparation</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'chat'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Chat Tutor
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'quiz'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'progress'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Progress
          </button>
        </div>

        {/* Quick Actions */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {[
              { topic: 'grammar', label: 'Grammar' },
              { topic: 'vocabulary', label: 'Vocabulary' },
              { topic: 'reading', label: 'Reading' },
              { topic: 'listening', label: 'Listening' },
            ].map((item) => (
              <button
                key={item.topic}
                onClick={() => createNewSession(item.topic, 'A2')}
                className="bg-white hover:bg-blue-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'quiz' && <QuizInterface />}
          {activeTab === 'progress' && <ProgressDashboard />}
        </div>

        {/* Session Info */}
        {currentSession && activeTab === 'chat' && (
          <div className="mt-4 bg-white rounded-lg shadow p-4 text-sm text-gray-600">
            <p>
              <strong>Current Session:</strong> {currentSession.topic.toUpperCase()} • Level: {currentSession.difficulty}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
