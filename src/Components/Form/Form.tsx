import { Overlay } from "../Overlay/Overlay"
import { Text } from "../Text/Text"

export const Form = () => {
  return (
    <Overlay>
        <div className="form-card">
        <Text variant="h1">Add Bookmark</Text>
        <form action="">
            <input type="text" placeholder="Description/Title"/>
            
            <input type="text" placeholder="Paste or Type Link" />
            
            <input type="text" placeholder="Tags"/>
            <button type="submit">Submit</button>

        </form>
        </div>
    </Overlay>
  )
}
