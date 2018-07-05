package org.openmrs.module.notifications.rest.resource;

import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.service.EventManagementService;
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

@Resource(name = RestConstants.VERSION_1 + "/event", supportedClass = Event.class, supportedOpenmrsVersions = {
        "1.9.*", "1.10.*", "1.11.*", "1.12.*", "2.0.*", "2.1.*" })
public class EventResource extends DelegatingCrudResource<Event> {

    private DelegatingResourceDescription getDescription() {
        DelegatingResourceDescription description = new DelegatingResourceDescription();
        description.addProperty("id");
        description.addProperty("uuid");
        description.addProperty("name");
        description.addProperty("description");
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
        List<Event> eventList = Context.getService(EventManagementService.class).getAllEvents();
        return new AlreadyPaged<Event>(context, eventList, false);
    }

    @Override
    public Event getByUniqueId(String uuid) {
        return Context.getService(EventManagementService.class).getEventByUuid(uuid);
    }

    @Override
    protected void delete(Event delegate, String reason, RequestContext context) throws ResponseException {

    }

    @Override
    public Event newDelegate() {
        return null;
    }

    @Override
    public Event save(Event delegate) {
        return null;
    }

    @Override
    public void purge(Event delegate, RequestContext context) throws ResponseException {

    }

}
