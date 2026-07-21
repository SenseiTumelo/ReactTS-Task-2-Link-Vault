import type React from "react"

type props = {
    children: React.ReactNode,
    className?: string
}

export const ContainerComponent: React.FC<props> = ({children, className}) => {
  return (
    <div style={{maxWidth: 1200, padding: 10}} className={className}>{children}</div>
  )
}
