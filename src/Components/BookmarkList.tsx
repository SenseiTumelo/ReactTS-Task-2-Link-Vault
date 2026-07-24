
import { useState, useEffect } from "react";
import { BookmarkItem } from "./BookmarkItem"
import { Text } from "./Text/Text"


const getBookmarkList = () => {
  const bookmarkList = localStorage.getItem("bookmarkList");
  return bookmarkList ? JSON.parse(bookmarkList) : [];
}

export const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState(() => {
        const storedBookmarks = localStorage.getItem("bookmarkList");
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    });

    useEffect(() => {
        setBookmarks(getBookmarkList());
    }, [bookmarks]);
    
    
    
    return (
     <main>
        
        <div className="cards">
            <Text variant="h1">Bookmark List</Text>
            {
                bookmarks.length > 0 ? (
                                <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Link(URL)</th>
                        <th>tags</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <BookmarkItem/>
                </tbody>

            </table>
                ) : (
                    <p> No bookmarks available. </p>
                )
            }

        </div>
            
    </main>
  )
}
