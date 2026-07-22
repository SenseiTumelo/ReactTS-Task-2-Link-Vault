import type React from "react"

type tagProps ={
    children: React.ReactNode,
    style?: React.CSSProperties

}
export const Tags: React.FC<tagProps> = ({children, style}) => {
  return (
    <button style={style}>{children}</button>
  )
}
