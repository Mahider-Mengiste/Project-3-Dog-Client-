// import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const LeashForm = (props) => {
    const {leash, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor=" leashType">Leash Type</Form.Label>
                <Form.Control
                    placeholder="What is your dog's leash type?"
                    name="leashType"
                    id="leashType"
                    value={ leash.leashType }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="quantity">Quantity</Form.Label>
                <Form.Control
                    placeholder="How many leash does your dog have?"
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={ leash.quantity }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is the leash changed frequently?"
                    name="isChangedFrequently"
                    defaultChecked={ leash.isChangedFrequently }
                    onChange={ handleChange }
                />
                <Form.Select 
                    aria-label="leash material"
                    name="condition"
                    defaultValue={leash.material}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="leather">leather</option>
                    <option value="nylon">nylon</option>
                    <option value="chain">chain</option>
                    <option value="cottontype">cottontype</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default LeashForm