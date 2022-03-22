import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formJSON from '../formData.json';
import './Form.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaskedInput from 'react-text-mask';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const FormComponent = () => {

    const navigate = useNavigate();
    const [current, setCurrent] = useState(null);
    const [validated, setValidated] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '', phone_number: '', street_address: '', post_code: '', country: ''
    });
    const [formErrors, setFormErrors] = useState({
        first_name: '', last_name: '', email: '', phone_number: '', street_address: '', post_code: '', country: ''
    });

    useEffect(() => {
        setFormErrors(validateForm(formData));
    }, [formData])

    const onSubmit = (e) => {
<<<<<<< HEAD
        const url = 'https://enovode7uq1r.x.pipedream.net/'
        e.preventDefault();
        const formDataJSON = JSON.stringify({
            ...formData, phone_number: formatPhoneNumber(formData.phone_number)
        });
        localStorage.setItem('formData', formDataJSON);
        axios.post(url, formDataJSON)
        navigate(`/merci/${formData.first_name}`)
=======
        // const url = 'https://enovode7uq1r.x.pipedream.net/';
        const form = e.currentTarget;
        setToggleSubmit(true);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            // setFormErrors(validateForm(formData));
            // console.log(formErrors);

        } else {
            e.preventDefault();
            setValidated(true);
            const formDataJSON = JSON.stringify({
                ...formData, phone_number: formatPhoneNumber(formData.phone_number)
            });

            localStorage.setItem('formData', formDataJSON);
            // axios.post(url, formDataJSON);
            navigate(`/merci/${formData.first_name}`);
        }
>>>>>>> test
    }

    const validateForm = (values) => {
        const errors = {};
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        if (!emailRegex.test(values.email)) {
            errors.email = "SVP entrez un email valide"
        } else { errors.email = "" }

        if (!phoneRegex.test(values.phone_number)) {
            errors.phone_number = "SVP entrez votre téléphone en format (123) 123-1234"
        } else { errors.phone_number = "" }

        if (!values.first_name) {
            errors.first_name = 'Prénom non valide';
        } else { errors.first_name = '' }

        if (!values.last_name) {
            errors.last_name = 'Nom nom valide'
        } else { errors.last_name = '' }

        if (!values.street_address) {
            errors.street_address = 'SVP entrez un adresse'
        } else { errors.street_address = '' }

        if (!values.post_code) {
            errors.post_code = 'SVP entrez un code postal'
        } else { errors.post_code = '' }

        if (!values.country) {
            errors.country = 'SVP choisez un pays'
        } else { errors.country = '' }
        return errors;
    }



    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // validateInput(e.target);
        setCurrent(e.target)
        // console.log(e.target.value)
        console.log(formErrors)
    }

    return (
        <div id="main-container" className="container pt-2 w-50 d-grid h-100">
            <Form noValidate validated={validated} id="form" className="w-100" onSubmit={onSubmit}>
                <MaskedInput
                    className="mb-3" id="input"
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}

                />
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
                                            // console.log(fields)
                                            return (
                                                Object.entries(fields).map(([k, v]) => {
                                                    console.log(k, v)
                                                    if (v === 'text') {
                                                        // do fields IF check here
                                                        return (
                                                            <Form.Group key={fields.name} className="mb-3" controlId="input">
                                                                <Form.Label className="mb-1">{fields.label}</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    onChange={onChange}
                                                                    onClick={e => console.log(formErrors)}
                                                                    isValid={toggleSubmit && formData[fields.name]}
                                                                    // isInvalid={toggleSubmit && !formData[fields.name].length}
                                                                    isInvalid={toggleSubmit && formErrors[fields.name]}
                                                                    value={formData[fields.name]}

                                                                    name={fields.name} type={fields.type} placeholder={fields.label} />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formErrors[fields.name]}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        )
                                                    } else if (v === 'dropdown') {
                                                        return (
                                                            <>
                                                                <Form.Label key={fields.name} className="mb-1">{fields.label}</Form.Label>
                                                                <Form.Select id="input" className="mb-3" aria-label={fields.label}
                                                                    isInvalid={toggleSubmit && formErrors[fields.name]}
                                                                    isValid={toggleSubmit && formData[fields.name]}
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
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formErrors[fields.name]}
                                                                </Form.Control.Feedback>
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