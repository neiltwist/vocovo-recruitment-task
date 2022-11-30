import { useEffect, useState } from 'react'
import moment from 'moment'

import './App.css'

const APPLIANCES_LIST_URL = 'http://localhost:8080/appliances/list'
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

function Appliance({ id, name, type, createdAt }) {
  return (
    <>
      <td>{id}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{moment(createdAt).format(DATE_FORMAT)}</td>
    </>
  )
}

function ApplianceList() {
  const [appliances, setAppliances] = useState([])
  const [sortBy, setSortBy] = useState(null)
  useEffect(() => {
    fetch(APPLIANCES_LIST_URL)
      .then((response) => {
        return response.json()
      })
      .then(setAppliances)
  }, [])

  const compareNumbers = (a, b) => a[sortBy] - b[sortBy]
  const compareStrings = (a, b) =>
    a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
  const compareDates = (a, b) =>
    moment(a[sortBy]).isBefore(b[sortBy])
      ? -1
      : moment(a[sortBy]).isBefore(b[sortBy])
      ? 1
      : 0

  const sortedAppliances =
    sortBy !== null
      ? sortBy === 'id'
        ? appliances.slice().sort(compareNumbers)
        : sortBy === 'createdAt'
        ? appliances.slice().sort(compareDates)
        : appliances.slice().sort(compareStrings)
      : appliances
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => setSortBy('id')}>ID</th>
          <th onClick={() => setSortBy('name')}>Name</th>
          <th onClick={() => setSortBy('type')}>Type</th>
          <th onClick={() => setSortBy('createdAt')}>Created At</th>
        </tr>
      </thead>
      <tbody>
        {sortedAppliances.map((appliance, index) => (
          <tr key={index}>
            <Appliance {...appliance} />
          </tr>
        ))}
      </tbody>
    </table>
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
