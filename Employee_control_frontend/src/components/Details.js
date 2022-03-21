import React, {useState, useEffect } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap';


function Details() {
const  {id} = useParams()
const url = `http://localhost:9090/api/v1/employees/${id}`
const [employees, setEmployees] = useState(null)

useEffect (() => {
axios.get(url)
    .then(response =>{
    setEmployees(response.data)
    console.log(response)
    })
}, [url])

if(employees) {
return (     
    employees.map(employee => (
    <Card style={{background:'grey', color: 'white'}}>
        <Card.Header><h1>Employee</h1></Card.Header>
        <h3>{employee.id}</h3>
        <h4>{employee.firstName} {employee.lastName}</h4>
        <h4>{employee.emailId}</h4>
        <Button href={'/employee/update/'+ employee.id }>Update</Button>
        <Button >Delete</Button>
    </Card>
    ))
)
}

return (
<div >

</div>
)
}

export default Details;