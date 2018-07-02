import React from 'react';
import { Link } from "react-router-dom";
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import ChipsArray from './Chips';
import UrlHelper from "../../../utilities/urlHelper";

class SubscriptionEntry extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.subscription = null;

        this.state = {
            uuid: this.subscription != null ? this.subscription.uuid : null,
            name: this.subscription != null ? this.subscription.name : '',
            description: this.subscription != null && this.subscription.description != null ? this.subscription.description : '',
            eventId: this.subscription != null ? this.subscription.uuid : null,
            disableSubmit: false
        };

        this.urlHelper = new UrlHelper();
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.setState({
            disableSubmit: true
        });
        const parameters = {
            uuid: this.state.uuid,
            name: this.state.name,
            eventId: this.state.eventId,
            description: this.state.description
        };

        axios({
            method: 'post',
            url: this.urlHelper.apiBaseUrl() + (this.state.uuid != null ? '/notification/' + this.state.uuid : '/notification'),
            headers: {'Content-Type': 'application/json'},
            data: parameters
        })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse);
            });
    }

    render() {
        return (
            <div id="body-wrapper">
                <Form horizontal onSubmit={this.onSubmitHandler}>
                    <Row>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
                            </Col>
                            <Col sm={4}>
                                <FormControl type="text" placeholder="Name" value={this.state.name} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Description
                            </Col>
                            <Col sm={4}>
                                <FormControl componentClass="textarea" placeholder="" value={this.state.description} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={2}>
                                Event Type
                            </Col>
                            <Col sm={4}>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    <option value="other">...</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={2}>
                                Patients
                            </Col>
                            <Col sm={4}>
                                <ChipsArray />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect">
                            <Col smOffset={2} sm={2}>
                                <Link
                                    to={`${this.urlHelper.owaPath()}/edit.html`}
                                    className={`${this.urlHelper.owaPath()}/edit.html`}>
                                    Add Patient(s)
                                </Link>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Active
                            </Col>
                            <Col sm={2}>
                                <Checkbox />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Created By
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static>Super User - 17/05/18 1:30:34 AM IST</FormControl.Static>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Updated By
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static>Super User - 17/05/18 1:30:34 AM IST</FormControl.Static>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={1}>
                                <Button type="submit">Save</Button>
                            </Col>
                            <Col>
                                <Button>Close</Button>
                            </Col>
                        </FormGroup>
                    </Row>
                </Form>
            </div>
        );
    }
}

SubscriptionEntry.propTypes = {
};

export default SubscriptionEntry;
