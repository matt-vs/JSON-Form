import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formJSON from '../formData.json';
import './Form.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap';

const FormComponent = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '', phone_number: '', street_address: '', post_code: '', country: ''
    })

    const onSubmit = (e) => {
        const url = 'https://enovode7uq1r.x.pipedream.net/'
        e.preventDefault();
        const formDataJSON = JSON.stringify({
            ...formData, phone_number: formatPhoneNumber(formData.phone_number)
        });
        localStorage.setItem('formData', formDataJSON);
        axios.post(url, formData)
        navigate(`/merci/${formData.first_name}`)
    }

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <div id="main-container" className="container pt-2 w-50 d-grid h-100">
            <Form id="form" className="w-100" onSubmit={onSubmit}>
                {
                    formJSON.questions.map((i) => {
                        return (
                            // map over objects in questions array
                            Object.entries(i).map(([k, v]) => {
                                // if 'title' return a Label
                                if (k === 'title') {
                                    return (
                                        <div id="section-divider" key={k} className="h5 text-center mb-3">
                                            {v}
                                        </div>
                                    );
                                }
                                // Else Return Fields
                                else {
                                    return (
                                        // map over fields
                                        v.map(fields => {

                                            return (
                                                Object.entries(fields).map(([k, v]) => {
                                                    if (v === 'text') {
                                                        return (
                                                            <Form.Group key={fields.name} className="mb-3">
                                                                <Form.Label className="mb-1">{fields.label}</Form.Label>
                                                                <Form.Control
                                                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                    id="input" name={fields.name} type={fields.type} placeholder={fields.label} />
                                                            </Form.Group>
                                                        )
                                                    } else if (v === 'dropdown') {
                                                        return (
                                                            <>
                                                                <Form.Label key={fields.name} className="mb-1">{fields.label}</Form.Label>
                                                                <Form.Select id="input" className="mb-3" aria-label={fields.label}
                                                                    name={fields.name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}

                                                                >
                                                                    <option key={fields.name}>Choisir un pays</option>
                                                                    {fields.options.map(obj => {
                                                                        return (
                                                                            <option key={obj.value} value={obj.value}

                                                                            >{obj.label}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Form.Select>
                                                            </>
                                                        )
                                                    }
                                                }
                                                ))
                                        }
                                        ))
                                }
                            })
                        )
                    })
                }
                <div className="d-grid gap-2">
                    <Button id="btn" size="lg" className="mb-3" type='submit'>Soumettre</Button>
                </div>
            </Form >
        </div>
    )
}

export default FormComponent;
