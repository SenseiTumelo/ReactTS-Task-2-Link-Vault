import { db } from "../../db/data"
export const Searchbox = () => {
  return (
    <section>
        <input id="searchbox" name="searchbox" placeholder="Search Tittle, Description, Tags"type="text" />
         <div >
          {
            db.map((data)=>
            <button style={{backgroundColor: data.btnColor}}>
              {data.tag}
            </button>
            )
          }
        </div>
    </section>
  )
}
