import { db } from "../../db/data"
import { Text } from "../Text/Text"
export const DetailsCard = () => {
  return (
    <main>
        <div className="main-card">
            <div className="cards">
              {
                db.map((data)=><div className="card" key={data.id}>
                  <Text variant="h3">{data.title}</Text>
                  <Text variant="p">{data.url}</Text>
                  
                </div>)
              }
              
            </div>
        </div>
    </main>
  )
}
