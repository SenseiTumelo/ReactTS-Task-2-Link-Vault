
import { Text } from "../Text/Text"

export const Header = () => {
  const open = ()=>{

  }
  
  return (
    <header>
        <nav>
            <Text variant="h1">Bookmark</Text>
            <button onClick={open}>+Add</button>
        </nav>
    </header>
  )
}
