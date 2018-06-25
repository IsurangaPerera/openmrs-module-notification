package org.openmrs.module.notifications.rest.resource;

import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.RefRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.api.PageableResult;
import org.openmrs.module.webservices.rest.web.resource.impl.AlreadyPaged;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.response.ResponseException;

import java.util.List;

@Resource(name = RestConstants.VERSION_1 + "/notification", supportedClass = Subscription.class, supportedOpenmrsVersions = {
        "1.9.*", "1.10.*", "1.11.*", "1.12.*", "2.0.*", "2.1.*" })
public class SubscriptionResource extends DelegatingCrudResource<Subscription> {
	
	private DelegatingResourceDescription getDescription() {
		DelegatingResourceDescription description = new DelegatingResourceDescription();
		description.addProperty("id");
		description.addProperty("uuid");
		description.addProperty("name");
		description.addProperty("description");
		description.addProperty("event");
		description.addProperty("user");
		return description;
	}
	
	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		if ((rep instanceof DefaultRepresentation) || (rep instanceof RefRepresentation)) {
			return getDescription();
		}
		if ((rep instanceof FullRepresentation)) {
			return getDescription();
		}
		return null;
	}
	
	@Override
	protected PageableResult doGetAll(RequestContext context) throws ResponseException {
		List<Subscription> subscriptionList = Context.getService(SubscriptionManagementService.class).getAllSubscriptions();
		return new AlreadyPaged<Subscription>(context, subscriptionList, false);
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
}
