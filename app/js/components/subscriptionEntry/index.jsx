import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import React from 'react';
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import ChipsArray from './Chips';

class SubscriptionEntry extends React.Component {
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
              <Col smOffset={2} sm={1}>
                <Button>Add Patients(s)</Button>
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

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                                Retired
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