import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const DogForm = (props) => {
    const { dog, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="dogType">Dog Type</Form.Label>
                <Form.Control
                    placeholder="What is your dog's type?"
                    name="dogType"
                    id="dogType"
                    value={ dog.dogType}
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Image</Form.Label>
                <Form.Control
                    placeholder="Image URL"
                    name="image"
                    id="image"
                    value={dog.image}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Control
                    placeholder="How old is your dog?"
                    type="number"
                    name="age"
                    id="age"
                    value={ dog.age }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this dog trainable?"
                    name="trainable"
                    defaultChecked={ dog.adoptable  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default DogForm