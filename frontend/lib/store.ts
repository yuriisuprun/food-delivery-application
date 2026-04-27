import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatSession {
  id: string
  topic: string
  difficulty: string
  messages: Message[]
}

export interface UserProgress {
  userId: string
  cefrLevel: string
  totalScore: number
  totalQuestions: number
  weakAreas: Record<string, number>
  skillProgress: Array<{
    skill: string
    level: string
    score: number
    accuracy: number
  }>
}

interface ChatStore {
  currentSession: ChatSession | null
  userProgress: UserProgress | null
  isLoading: boolean
  error: string | null

  setCurrentSession: (session: ChatSession) => void
  addMessage: (message: Message) => void
  setUserProgress: (progress: UserProgress) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  currentSession: null,
  userProgress: null,
  isLoading: false,
  error: null,

  setCurrentSession: (session) => set({ currentSession: session }),
  addMessage: (message) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            messages: [...state.currentSession.messages, message],
          }
        : null,
    })),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
