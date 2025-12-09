"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string | null
  program: {
    id: string
    name: string
  }
  team: {
    id: string
    name: string
  }
}

interface ProjectCardProps {
  project: Project
  progress: number
  isComplete: boolean
  isSelected: boolean
  onClick: () => void
}

export function ProjectCard({ project, progress, isComplete, isSelected, onClick }: ProjectCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 md:pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-base md:text-lg line-clamp-2">{project.name}</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs md:text-sm">{project.program.name}</Badge>
              <Badge variant="outline" className="text-xs md:text-sm">{project.team.name}</Badge>
            </div>
          </div>
          {isComplete ? (
            <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-green-500 flex-shrink-0" />
          ) : (
            <Clock className="w-5 md:w-6 h-5 md:h-6 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{project.description || "Sin descripción"}</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs md:text-sm">
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
