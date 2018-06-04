import { connect } from "react-redux";
import React from 'react';
import { Link } from "react-router-dom";
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import ChipsArray from './Chips';
import UrlHelper from "../../../utilities/urlHelper";

class SubscriptionEntry extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.urlHelper = new UrlHelper();
  }
  render() {
    return (
      <div id="body-wrapper">
        <Form horizontal>
          <Row>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                                Name
              </Col>
              <Col sm={4}>
                <FormControl type="email" placeholder="Name" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}>
                      Description
              </Col>
              <Col sm={4}>
                <FormControl componentClass="textarea" placeholder="" />
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

const mapStateToProps = (state) => {
};

const actionCreators = {
};

export default connect(mapStateToProps, actionCreators)(SubscriptionEntry);