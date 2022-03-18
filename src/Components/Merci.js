import { useParams } from "react-router-dom";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import bootstrap from 'bootstrap';
import './Merci.css'


const Merci = () => {

    let params = useParams();
    const [newName, setNewName] = useState(params.name);
    const [formName, setFormName] = useState(params.name);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(newName);
        setFormName(newName);
    }

    return (
        <div id="main-container" className="container w-50 d-grid h-100">
            <div className="h5 text-center  mt-4 mb-3">Merci pour votre inscription, {formName}</div>
            <Form className="w-100" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="">Nouveau nom</Form.Label>
                    <Form.Control id="input" className="" onChange={(e) => setNewName(e.target.value)} type="text" placeholder="Entrez un nouveau nom" />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button id="btn" className="mb-4" type="submit">Soumettre</Button>
                </div>
            </Form>
        </div>
    )
}

export default Merci;