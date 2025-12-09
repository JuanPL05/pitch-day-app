"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, BarChart3 } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface ProjectScore {
  id: string
  name: string
  team: string
  program: string
  totalScore: number | null
  averageScore: number | null
  maxPossibleScore: number
  completionPercentage: number
  evaluationCount: number // Number of judges who completed all questions
  totalEvaluations: number // Total individual question evaluations
  totalJudges: number // Total number of judges
  rank: number
  blockAverages: Array<{
    blockName: string
    average: number | null
  }>
}

interface ProjectDetailsProps {
  project: ProjectScore | null
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  console.log("[v0] ProjectDetails: Displaying project:", project?.name)
  console.log("[v0] ProjectDetails: Project data:", project)

  // Obtener todos los bloques disponibles
  const { data: allBlocks } = useSWR("/api/blocks", fetcher, {
    onSuccess: (data) => console.log("[v0] ProjectDetails: All blocks loaded:", data?.length || 0),
    onError: (error) => console.error("[v0] ProjectDetails: Blocks error:", error),
  })

  if (!project) {
    console.log("[v0] ProjectDetails: No project data provided")
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">No se pudo cargar la información del proyecto</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Combinar todos los bloques con las evaluaciones del proyecto
  const allBlocksWithEvaluations = (allBlocks || []).map((block: any) => {
    const evaluation = project.blockAverages.find((ba: any) => ba.blockName === block.name)
    return {
      blockName: block.name,
      average: evaluation ? evaluation.average : null,
      hasEvaluation: !!evaluation
    }
  }).sort((a, b) => (b.average ?? 0) - (a.average ?? 0))

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-lg md:text-2xl">
            <Trophy className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
            Detalles del Proyecto
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="default" className="text-xs md:text-sm">Ranking #{project.rank}</Badge>
            <Badge variant="secondary" className="text-xs md:text-sm">{project.program}</Badge>
            <Badge variant="outline" className="text-xs md:text-sm">{project.team}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-3 md:p-6">
        {/* Project Overview */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 line-clamp-2">{project.name}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <Card>
              <CardContent className="p-2 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold text-primary">
                  {project.averageScore !== null ? project.averageScore.toFixed(1) : "0.0"}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Promedio</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold">
                  {project.totalScore !== null ? project.totalScore.toFixed(1) : "0.0"}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Puntuación</div>
                <div className="text-xs text-muted-foreground">
                  {project.averageScore ? `${((project.averageScore/5)*100).toFixed(0)}%` : '0%'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold">{project.evaluationCount}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Jueces</div>
                <div className="text-xs text-muted-foreground">de {project.totalJudges}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold">{Math.round(project.completionPercentage)}%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Completado</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 md:mb-6">
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span>Progreso de Evaluación</span>
              <span>{Math.round(project.completionPercentage)}%</span>
            </div>
            <Progress value={project.completionPercentage} className="h-2 md:h-3" />
          </div>
        </div>

        {/* Block Breakdown */}
        <div>
          <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
            Puntuaciones por Bloque
          </h4>

          <div className="space-y-2 md:space-y-4">
            {allBlocksWithEvaluations.map((block: any, index: number) => (
              <div key={block.blockName} className="space-y-1 md:space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="font-medium text-xs md:text-base truncate">{block.blockName}</span>
                    {!block.hasEvaluation && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">Sin eval.</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <Badge variant={index === 0 && block.hasEvaluation ? "default" : "outline"} className="text-xs md:text-sm">
                      {block.average !== null ? block.average.toFixed(1) : "0.0"}/5
                    </Badge>
                    {index === 0 && block.hasEvaluation && <Trophy className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 flex-shrink-0" />}
                  </div>
                </div>
                <Progress 
                  value={((block.average ?? 0) / 5) * 100} 
                  className={`h-1.5 md:h-2 ${!block.hasEvaluation ? 'opacity-50' : ''}`} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Performance Analysis */}
        <div>
          <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Análisis de Rendimiento</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Card>
              <CardContent className="p-2 md:p-4">
                <h5 className="font-medium mb-2 text-sm md:text-base">Fortalezas</h5>
                <div className="space-y-1">
                  {allBlocksWithEvaluations
                    .filter((block: any) => block.hasEvaluation && block.average !== null && block.average >= 4.0)
                    .map((block: any) => (
                      <div key={block.blockName} className="flex items-center gap-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm line-clamp-1">
                          {block.blockName} ({block.average !== null ? block.average.toFixed(1) : "0.0"})
                        </span>
                      </div>
                    ))}
                  {allBlocksWithEvaluations.filter((block: any) => block.hasEvaluation && block.average !== null && block.average >= 4.0).length ===
                    0 && <span className="text-xs md:text-sm text-muted-foreground">No hay bloques destacados</span>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2 md:p-4">
                <h5 className="font-medium mb-2 text-sm md:text-base">Áreas de Mejora</h5>
                <div className="space-y-1">
                  {allBlocksWithEvaluations
                    .filter((block: any) => block.hasEvaluation && block.average !== null && block.average < 3.0)
                    .map((block: any) => (
                      <div key={block.blockName} className="flex items-center gap-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm line-clamp-1">
                          {block.blockName} ({block.average !== null ? block.average.toFixed(1) : "0.0"})
                        </span>
                      </div>
                    ))}
                  
                  {/* Mostrar bloques sin evaluar como áreas que necesitan atención */}
                  {allBlocksWithEvaluations
                    .filter((block: any) => !block.hasEvaluation)
                    .map((block: any) => (
                      <div key={block.blockName} className="flex items-center gap-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm line-clamp-1">
                          {block.blockName} (Sin eval.)
                        </span>
                      </div>
                    ))}
                  
                  {allBlocksWithEvaluations.filter((block: any) => 
                    !block.hasEvaluation || (block.hasEvaluation && block.average !== null && block.average < 3.0)
                  ).length === 0 && (
                    <span className="text-xs md:text-sm text-muted-foreground">Sin áreas críticas</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
