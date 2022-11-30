import { useEffect, useState } from 'react'
import moment from 'moment'

const APPLIANCES_LIST_URL = 'http://localhost:8080/appliances/list'
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

function Appliance({ id, name, type, createdAt }) {
  return (
    <div key={id}>
      name: {name}, type: {type}, created:{' '}
      {moment(createdAt).format(DATE_FORMAT)}
    </div>
  )
}

function ApplianceList() {
  const [appliances, setAppliances] = useState([])
  useEffect(() => {
    fetch(APPLIANCES_LIST_URL)
      .then((response) => {
        console.log(response.status, response.headers.get('Location'))
        return response.json()
      })
      .then(setAppliances)
  }, [])
  return (
    <ul>
      {appliances.map((appliance) => (
        <li>
          <Appliance {...appliance} />
        </li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Appliances</h1>
      <ApplianceList></ApplianceList>
    </div>
  )
}

export default App
