interface DifficultyMeterProps {
  difficulty: string
}

export function DifficultyMeter({ difficulty }: DifficultyMeterProps) {
  const levels = ["Easy", "Moderate", "Challenging"]
  const index = levels.indexOf(difficulty)

  return (
    <div className="flex items-center justify-center">
      {levels.map((level, i) => (
        <div key={level} className={`w-4 h-4 rounded-full mx-1 ${i <= index ? "bg-primary" : "bg-gray-300"}`} />
      ))}
      <span className="ml-2">{difficulty}</span>
    </div>
  )
}

