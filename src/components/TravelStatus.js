export const TravelStatus = ({ status }) => {
  const colorVariants = {
    progress: 'bg-progress border-progressDarker',
    finished: 'bg-finished border-finishedDarker',
    planned: 'bg-planned border-plannedDarker',
  }

  const statusLabel = {
    progress: 'Em progresso',
    finished: 'Concluída',
    planned: 'Planejada',
  }

  return (
    <span className="flex items-center">
      <div className={`rounded-full mr-2.5 size-3 border ${colorVariants[status]}`}></div>
      {statusLabel[status]}
    </span>
  )
}
