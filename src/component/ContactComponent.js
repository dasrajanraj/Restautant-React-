import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Row,Label,Col, Button} from 'reactstrap';
import {Control,Form ,Errors} from 'react-redux-form';
import {Link } from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values){
        console.log("the user input data", JSON.stringify(values));
        this.props.resetFeedbackForm();
        this.props.postFeedback(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.contactType,values.message);

    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" href="/" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Your FeedBack</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values)=>this.handleSubmit(values)}>  
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2} > FirstName</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" 
                                    name="firstname" id="firstname" 
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2} > Lastname</Label>
                                    <Col md={10}>
                                    <Control.text
                                    model=".lastname" 
                                    name="lastname" id="lastname" 
                                    placeholder="Last Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2} > Tel Num</Label>
                                <Col md={10}>
                                    <Control.text 
                                    model=".telnum"
                                    name="telnum" id="telnum" 
                                    placeholder="Tel No."
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".telnum"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 numbers',
                                        maxLength: 'Must be 15 numbers or less',
                                        isNumber: 'Must be a number'
                                    }}
                                 />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2} >E-mail</Label>
                                <Col md={10}>
                                    <Control.text
                                    model=".email"
                                    col={10} 
                                    name="email" id="email" 
                                    placeholder="E-mail"
                                    className="form-control"
                                    validators={{
                                        required, validEmail
                                    }}
                                     />
                                    <Errors
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        validEmail: 'Invalid Email Address'
                                    }}
                                 />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6, offset:2}}>
                                    <div className="form-check">
                                            <Label check>
                                                <Control.checkbox
                                                model=".agree"
                                                    name="agree"
                                                    className="form-check-input"/> {' '}
                                                <strong>May we contact you?</strong>
                                            </Label>
                                    </div>
                                </Col>
                                <Label htmlFor="contactType" md={2} >Contact Type</Label>
                                <Col md>
                                    <Control.select model=".contactType" className="form-control" name="contactType" id="contactType">
                                        <option>TEL</option>
                                        <option>E-mail</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col  md={{size: 10,offset: 2}}>
                                    <Button type="submit" color="primary">Send FeedBack</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Contact;