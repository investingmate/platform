import React from 'react'

interface CustomTooltipProps {
  children: React.ReactNode,
  description: string
}

const CustomTooltip = (props: CustomTooltipProps) => {
  const {children, description} = props
  return (
    <div
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      data-bs-trigger='hover'
      title={description}
      className="cursor-pointer"
    >
      {children}
    </div>
  )
}

export {CustomTooltip}
