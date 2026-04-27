'use client'

import React, { useState } from 'react'
import { evaluateAPI } from '@/lib/api'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  type: 'open' | 'multiple_choice'
  options?: string[]
  correctAnswer?: string
  topic: string
}

interface EvaluationResult {
  score: number
  is_correct: boolean
  corrections: string[]
  explanation: string
  improvement_suggestions: string[]
  grammar_errors: Array<{
    error: string
    correction: string
    explanation: string
  }>
}

export default function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const sampleQuestion: QuizQuestion = {
    id: 'q1',
    question: 'Completa la frase: "Ieri io _____ al cinema con i miei amici."',
    type: 'multiple_choice',
    options: ['vado', 'sono andato', 'andrò', 'andrei'],
    correctAnswer: 'sono andato',
    topic: 'grammar',
  }

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) return

    setIsEvaluating(true)
    try {
      const result = await evaluateAPI.evaluateAnswer({
        user_id: 'user_123', // TODO: Get from auth
        question: currentQuestion.question,
        user_answer: userAnswer,
        correct_answer: currentQuestion.correctAnswer,
        question_type: currentQuestion.type,
        topic: currentQuestion.topic,
      })

      setEvaluation(result.feedback)
      setShowFeedback(true)
    } catch (error) {
      console.error('Error evaluating answer:', error)
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleNextQuestion = () => {
    setUserAnswer('')
    setEvaluation(null)
    setShowFeedback(false)
    // Load next question
    setCurrentQuestion(sampleQuestion)
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={() => setCurrentQuestion(sampleQuestion)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>

        {currentQuestion.type === 'multiple_choice' ? (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, idx) => (
              <label key={idx} className="flex items-center p-3 border rounded-lg hover:bg-blue-50 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        )}
      </div>

      {!showFeedback ? (
        <button
          onClick={handleSubmitAnswer}
          disabled={!userAnswer.trim() || isEvaluating}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {isEvaluating ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Evaluating...
            </>
          ) : (
            'Submit Answer'
          )}
        </button>
      ) : evaluation ? (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            evaluation.is_correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {evaluation.is_correct ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
            <div>
              <p className="font-semibold">
                {evaluation.is_correct ? 'Correct!' : 'Not quite right'}
              </p>
              <p className="text-sm">Score: {evaluation.score}/10</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Explanation</h3>
            <p className="text-sm text-gray-700">{evaluation.explanation}</p>
          </div>

          {evaluation.corrections.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Corrections</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {evaluation.corrections.map((correction, idx) => (
                  <li key={idx}>• {correction}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.improvement_suggestions.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tips for Improvement</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {evaluation.improvement_suggestions.map((suggestion, idx) => (
                  <li key={idx}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Next Question
          </button>
        </div>
      ) : null}
    </div>
  )
}
