import React, { useState, useEffect } from 'react'
import { Card, Container, Button, Row, Col, Form, } from "react-bootstrap";
import axios from 'axios'
import { useNavigate, useParams, } from "react-router-dom";

export default function AddEmp() {
    const navigate = useNavigate();
    let { id } = useParams()
    const [newId, setID] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailID] = useState('')

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`http://localhost:9090/api/v1/employees/${id}`)
                .then(res => {
                    console.log(res.data)
                    setID(res.data.id)
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
                    setEmailID(res.data.emailId)
                }).catch(err => console.log(err))
        }
    }, []);

    async function getId() {
        return axios.get(`http://localhost:9090/api/v1/employees/${newId}`).then(res => res.data.id)
    }

    let submitUpdate = (e) => {
        e.preventDefault();
        const data = {
            "id": newId,
            "firstName": firstName,
            "lastName": lastName,
            "emailId": emailId
        }

		alert("Employee Updated Succefully!")
		axios.put("http://localhost:9090/api/v1/employees", data).then(res => navigate('/')).catch(err => console.log(err));
    }

    return (
        <>
            <Container className="border border-dark bg-dark text-white">
                {id === undefined && <Card.Header className="text-Left mt-4 mb-4"><h3><b>Add Employee</b></h3></Card.Header>}
                {id !== undefined && <Container className="text-center mt-4 mb-4"><h3><b>Update Employee</b></h3></Container>}
                <Card className="border border-dark bg-dark text-white">
                    <Card.Body >
                        <Form onSubmit={submitUpdate} method="POST" action="http://localhost:9090/api/v1/employees">
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label column sm="3"><h5>ID:</h5></Form.Label>
                                        <Form.Control 
                                            classNames={"bg-dark text-white"} 
                                            type="text" name="newId" 
                                            value={newId}
                                            onChange={e => setID(e.target.value)} 
                                            required />
                                    <Form.Label column sm="3"><h5>First Name:</h5></Form.Label>
                                        <Form.Control 
                                            classNames={"bg-dark text-white"} 
                                            type="text" name="firstName" 
                                            value={firstName} 
                                            onChange={e => setFirstName(e.target.value)} 
                                            required />
                                    <Form.Label  column sm="3"><h5>Last Name:</h5></Form.Label>
                                        <Form.Control 
                                            classNames={"bg-dark text-white"} 
                                            type="text" name="lastName" 
                                            value={lastName} 
                                            onChange={e => setLastName(e.target.value)} 
                                            required />
                                    <Form.Label  column sm="3"><h5>Email:</h5></Form.Label>
                                        <Form.Control 
                                            classNames={"bg-dark text-white"} 
                                            type="email" name="emailId" 
                                            value={emailId} 
                                            onChange={e => setEmailID(e.target.value)} 
                                            required />
                                </Form.Group>
                            </Row>
                            <Button size="8m" variant="success" type="submit">Update</Button> {' '}
                            <Button size="8m" variant="danger" type="delete" href="/">Delete</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}