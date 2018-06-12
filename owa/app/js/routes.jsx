/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import BreadCrumb from './components/breadCrumb';
import SubscriptionTable from './components/subscriptionTable';
import SubscriptionEntry from './components/subscriptionEntry';
import PatientEntry from './components/patientEntry';
import UrlHelper from '../utilities/urlHelper';

const urlHelper = new UrlHelper();
const Routes = store => (
  <div>
    <Header />
    <Switch>
      <Route path={`${urlHelper.owaPath()}/index.html`} component={SubscriptionTable} />
      <Route path={`${urlHelper.owaPath()}/subscriptions.html`} component={SubscriptionEntry} />
      <Route path={`${urlHelper.owaPath()}/edit.html`} component={PatientEntry} />
    </Switch>
  </div>
);

export default Routes;
