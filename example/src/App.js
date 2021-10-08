import React from 'react'

import DataTable from 'mllt-datatable'
import 'mllt-datatable/dist/index.css'

import { employeesData, usersData } from './data'

const labelsEmployees = [
  { label: 'First name', sortKey: 'firstName' },
  { label: 'Last name', sortKey: 'lastName' },
  { label: 'Start date', sortKey: 'dateStart' },
  { label: 'Department', sortKey: 'department' },
  { label: 'Date of birth', sortKey: 'dateBirth' },
  { label: 'Street', sortKey: 'street' },
  { label: 'City', sortKey: 'city' },
  { label: 'State', sortKey: 'state' },
  { label: 'Zip code', sortKey: 'zipCode' }
]

const labelsUsers = [
  { label: 'Name', sortKey: 'name' },
  { label: 'Email', sortKey: 'email' },
  { label: 'Password', sortKey: 'password' }
]

const App = () => {
  return <main style={{ margin: '2%'}}>
    <DataTable labels={labelsEmployees} data={employeesData} itemsPerPage={10}/>
    <br />
    <br />
    <br />
    <DataTable labels={labelsUsers} data={usersData} itemsPerPage={5}/>
  </main> 
}

export default App
