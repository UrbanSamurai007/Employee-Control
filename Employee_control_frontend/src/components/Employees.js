import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap';

function Employees() {
  const url = 'http://localhost:9090/api/v1/employees/'
  const [employees, setEmployees] = useState(null)

  useEffect (() => {
    axios.get(url)
      .then(response =>{
        setEmployees(response.data)
        console.log(response)
      })
  }, [])

  if(employees) {
    return (     
      employees.map(employee => (
        <Card.Body>
          <h2>{employee.id}</h2>
          <h3>{employee.firstName} {employee.lastName}</h3>
          <Button  href={ '/employee/' + employee.id } >View</Button>
        </Card.Body>
      ))
    )
  }

  return (
    <Card ClassName={"border border=dark bg-dar text-white"}>
      <Card.Header>Employees</Card.Header>
    </Card>
  )
}

export default Employees;