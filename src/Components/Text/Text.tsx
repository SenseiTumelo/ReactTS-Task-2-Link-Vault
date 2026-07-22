import type React from "react"

type textProps = {
    variant?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Text: React.FC<textProps> = ({variant, children, style}) => {
 
    if (variant==='h1') return(<h1 style={style}>{children}</h1>);
    if (variant==='h2') return(<h2 style={style}>{children}</h2>);
    if (variant==='h3') return(<h3 style={style}>{children}</h3>);
    if (variant==='p') return(<p style={style}>{children}</p>);

  
    return (
    <div style={style}>{children}</div>
  )
}
