'use client'

import React, { useEffect, useState } from 'react'
import { progressAPI } from '@/lib/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface SkillData {
  skill: string
  level: string
  score: number
  accuracy: number
}

export default function ProgressDashboard() {
  const [skillData, setSkillData] = useState<SkillData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userId = 'user_123' // TODO: Get from auth
        const response = await progressAPI.getUserProgress(userId)
        setSkillData(response.skill_progress || [])
      } catch (err) {
        setError('Failed to load progress')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading progress...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  const chartData = skillData.map((skill) => ({
    name: skill.skill,
    score: skill.score,
    accuracy: Math.round(skill.accuracy * 100),
  }))

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold">Your Progress</h2>
      </div>

      {skillData.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No progress data yet. Start learning!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {skillData.map((skill) => (
              <div key={skill.skill} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg capitalize">{skill.skill}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">
                    Level: <span className="font-semibold">{skill.level}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Score: <span className="font-semibold">{skill.score.toFixed(1)}/100</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Accuracy: <span className="font-semibold">{Math.round(skill.accuracy * 100)}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Score Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" name="Score" />
                <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}
