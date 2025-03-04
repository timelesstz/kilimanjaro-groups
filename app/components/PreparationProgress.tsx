import { useState, useEffect } from 'react'

interface PreparationTask {
  id: string
  task: string
  completed: boolean
}

const defaultTasks: PreparationTask[] = [
  { id: 'read-guide', task: 'Read preparation guide', completed: false },
  { id: 'book-flights', task: 'Book flights', completed: false },
  { id: 'obtain-visa', task: 'Obtain visa', completed: false },
  { id: 'get-insurance', task: 'Get travel insurance', completed: false },
  { id: 'medical-checkup', task: 'Complete medical check-up', completed: false },
  { id: 'gather-equipment', task: 'Gather required equipment', completed: false },
  { id: 'start-training', task: 'Start physical training', completed: false },
  { id: 'vaccinations', task: 'Get necessary vaccinations', completed: false },
  { id: 'documents', task: 'Prepare required documents', completed: false },
  { id: 'currency', task: 'Arrange currency/payments', completed: false }
]

export default function PreparationProgress() {
  const [tasks, setTasks] = useState<PreparationTask[]>(defaultTasks)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Load saved progress from localStorage
    const savedTasks = localStorage.getItem('preparationTasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    // Calculate and update progress
    const completedTasks = tasks.filter(task => task.completed).length
    const progressPercentage = Math.round((completedTasks / tasks.length) * 100)
    setProgress(progressPercentage)
    
    // Save to localStorage
    localStorage.setItem('preparationTasks', JSON.stringify(tasks))
  }, [tasks])

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      setTasks(defaultTasks)
      localStorage.removeItem('preparationTasks')
    }
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Preparation Progress</h2>
        <button
          onClick={handleResetProgress}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Reset Progress
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Overall Progress</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
              />
              <span className={`ml-3 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.task}
              </span>
            </div>
          ))}
        </div>

        {progress === 100 && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg">
            <p className="font-medium">🎉 Congratulations!</p>
            <p className="text-sm">You've completed all preparation tasks. You're ready for your Kilimanjaro adventure!</p>
          </div>
        )}
      </div>
    </section>
  )
} 