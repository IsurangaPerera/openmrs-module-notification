package org.openmrs.module.notifications.rest.resource;

import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.api.PageableResult;
import org.openmrs.module.webservices.rest.web.resource.impl.AlreadyPaged;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.response.ResponseException;

import java.util.List;

@Resource(name = RestConstants.VERSION_1 + "/bedtype", supportedClass = Subscription.class, supportedOpenmrsVersions = {
		"1.9.*", "1.10.*", "1.11.*", "1.12.*", "2.0.*", "2.1.*"})
public class SubscriptionResource extends DelegatingCrudResource<Subscription> {

	@Override
	protected PageableResult doGetAll(RequestContext context) throws ResponseException {
		List<Subscription> bedTypeList = Context.getService(SubscriptionManagementService.class).getAllSubscriptions();
		return new AlreadyPaged<Subscription>(context, bedTypeList, false);
	}

	@Override
	public Subscription getByUniqueId(String s) {
		return null;
	}

	@Override
	protected void delete(Subscription subscription, String s, RequestContext requestContext) throws ResponseException {

	}

	@Override
	public Subscription newDelegate() {
		return null;
	}

	@Override
	public Subscription save(Subscription subscription) {
		return Context.getService(SubscriptionManagementService.class).saveSubscription(subscription);
	}

	@Override
	public void purge(Subscription subscription, RequestContext requestContext) throws ResponseException {

	}

	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation representation) {
		return null;
	}
}
