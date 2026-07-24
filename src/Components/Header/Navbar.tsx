import { Text } from "../Text/Text"
import { useNavigate } from "react-router-dom"


export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
        <nav>
            <Text variant="h1">Bookmark</Text>
            <button onClick={()=>navigate("/create-bookmark")} >+Add</button>
        </nav>
    </header>
  )
}
