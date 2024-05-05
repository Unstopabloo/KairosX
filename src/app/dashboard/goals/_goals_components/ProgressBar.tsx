'use client'

import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ProgressBarProps {
  goal: number;
  actual: number;
  isdone: boolean;
}

export default function ProgressBar({ goal, actual, isdone }: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (isdone) {
      setProgress(100)
      return
    }
    setProgress((actual / goal) * 100)
  }, [])

  return (
    <Progress value={progress} />
  )
}