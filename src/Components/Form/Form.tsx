import { useEffect, useState } from "react"
import { Overlay } from "../Overlay/Overlay"
import { Text } from "../Text/Text"

export const Form = () => {
  const [title, setTitle] = useState('');
  const [link,setLink] = useState('');
  const [tag, setTag] = useState('');


useEffect(()=>{
    localStorage.setItem('title', JSON.stringify(title)),
    localStorage.setItem('link', JSON.stringify(link)),
    localStorage.setItem('tag', JSON.stringify(tag))
 },[title,link,tag])
  
let handleClick = ()=>{
    console.log(title, link, tag)
}
  return (
    <Overlay>
        <div className="form-card">
        <Text variant="h1">Add Bookmark</Text>
        <form action="">
            <input type="text" placeholder="Description/Title" onChange={(e)=> {setTitle(e.target.value)}}/>
            
            <input type="text" placeholder="Paste or Type Link" onChange={(e)=> {setLink(e.target.value)}}/>
            
            <input type="text" placeholder="Tags" onChange={(e)=> {setTag(e.target.value)}}/>
            <button onClick={handleClick} >Submit</button>

        </form>
        </div>
    </Overlay>
  )
}
