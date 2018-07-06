package org.openmrs.module.notifications.rest.resource;

import org.openmrs.Patient;
import org.openmrs.User;
import org.openmrs.api.PatientService;
import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;
import org.openmrs.module.notifications.service.EventManagementService;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.ConversionUtil;
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
import org.openmrs.module.webservices.rest.web.response.ConversionException;
import org.openmrs.module.webservices.rest.web.response.IllegalPropertyException;
import org.openmrs.module.webservices.rest.web.response.ResponseException;

import java.util.LinkedHashMap;
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
        description.addProperty("creator");
        description.addProperty("changedBy");
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
    public Subscription getByUniqueId(String uuid) {
        return Context.getService(SubscriptionManagementService.class).getSubscriptionByUuid(uuid);
    }

    @Override
    public Object create(SimpleObject propertiesToCreate, RequestContext context) throws ResponseException {
        if (propertiesToCreate.get("name") == null || propertiesToCreate.get("description") == null
                || propertiesToCreate.get("eventId") == null)
            throw new ConversionException("Required parameters:  name, description, eventId");

        Subscription subscription = this.constructSubscription(null, propertiesToCreate);
        Context.getService(SubscriptionManagementService.class).saveSubscription(subscription);
        LinkedHashMap<String, String> patients = propertiesToCreate.get("patients");

        this.constructSubscriptionPatientAssignment(subscription, patients);

        return ConversionUtil.convertToRepresentation(subscription, context.getRepresentation());
    }

    @Override
    public Object update(String uuid, SimpleObject propertiesToUpdate, RequestContext context) throws ResponseException {
        Subscription subscription = this.constructSubscription(uuid, propertiesToUpdate);
        Context.getService(SubscriptionManagementService.class).saveSubscription(subscription);
        if (propertiesToUpdate.get("patients") != null) {
            LinkedHashMap<String, String> patients = propertiesToUpdate.get("patients");
            Context.getService(SubscriptionManagementService.class)
                    .deleteSubscriptionPatientAssignment(subscription.getId());
            this.constructSubscriptionPatientAssignment(subscription, patients);
        }

        return ConversionUtil.convertToRepresentation(subscription, context.getRepresentation());
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

    private void constructSubscriptionPatientAssignment(Subscription subscription, LinkedHashMap<String, String> properties) {
        for(String id : properties.keySet()) {
            Patient patient = Context.getService(PatientService.class)
                    .getPatientByUuid(properties.get(id));
            SubscriptionPatientAssignment spa = new SubscriptionPatientAssignment();
            spa.setPatient(patient);
            spa.setSubscription(subscription);
            Context.getService(SubscriptionManagementService.class).saveSubscriptionPatientAssignment(spa);
        }
    }

    private Subscription constructSubscription(String uuid, SimpleObject properties) {
        Subscription subscription;
        User user = Context.getAuthenticatedUser();

        if (uuid != null) {
            subscription = Context.getService(SubscriptionManagementService.class).getSubscriptionByUuid(uuid);
            if (subscription == null)
                throw new IllegalPropertyException("Subscription not exist");

            subscription.setName((String) properties.get("name"));
            subscription.setDescription((String) properties.get("description"));
            Event event = Context.getService(EventManagementService.class)
                    .getEventByUuid((String) properties.get("eventId"));
            if (event == null)
                throw new IllegalPropertyException("Event not exist");
            subscription.setEvent(event);

        } else {
            subscription = new Subscription();

            subscription.setName((String) properties.get("name"));
            subscription.setDescription((String) properties.get("description"));
            Event event = Context.getService(EventManagementService.class)
                    .getEventByUuid((String) properties.get("eventId"));
            if (event == null)
                throw new IllegalPropertyException("Event not exist");

            subscription.setEvent(event);
            subscription.setUser(user);
            subscription.setCreator(user);
        }

        subscription.setChangedBy(user);

        return subscription;
    }
}
