/*import { DetailsCard } from "./Components/DetailsCard/DetailsCard"
import { Header } from "./Components/Header/Header"
import { Searchbox } from "./Components/Searchbox/Searchbox"*/

import { Route, Routes } from "react-router-dom"
import { Navbar } from "./Components/Header/Navbar"
import { BookmarkList } from "./Components/BookmarkList"
import { BookmarkForm } from "./Components/BookmarkForm"
import { Searchbox } from "./Components/Searchbox/Searchbox"


function App() {


  return (
   /* <>
    <Header/>
   
    <DetailsCard/>
    </>*/
    <>
      <Navbar/>
      <Searchbox bookmarks={[]} onSearchResults={function (filtered: { id: string; title: string; description: string; tags: string[]; url: string }[]): void {
        throw new Error("Function not implemented.")
      } }/>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookmarkList />}/>
          <Route path="/create-bookmark" element={<BookmarkForm />}/>
          <Route path="/edit-bookmark:id" element={<BookmarkForm />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
