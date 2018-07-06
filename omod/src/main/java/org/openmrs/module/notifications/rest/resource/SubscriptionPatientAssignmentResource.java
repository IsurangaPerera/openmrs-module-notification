package org.openmrs.module.notifications.rest.resource;

import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.module.webservices.rest.SimpleObject;
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
import org.openmrs.module.webservices.rest.web.response.ResponseException;

import java.util.List;

@Resource(name = RestConstants.VERSION_1 + "/assignment", supportedClass = SubscriptionPatientAssignment.class, supportedOpenmrsVersions = {
        "1.9.*", "1.10.*", "1.11.*", "1.12.*", "2.0.*", "2.1.*" })
public class SubscriptionPatientAssignmentResource extends DelegatingCrudResource<SubscriptionPatientAssignment> {

    private DelegatingResourceDescription getDescription() {
        DelegatingResourceDescription description = new DelegatingResourceDescription();
        description.addProperty("id");
        description.addProperty("uuid");
        description.addProperty("patient");
        description.addProperty("subscription");
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
        if (context.getParameter("sId") != null) {
            throw new ConversionException("Required parameter:  subscriptionUuid");
        }
        List<SubscriptionPatientAssignment> subscriptionPatientList = Context
                .getService(SubscriptionManagementService.class)
                .getAllSubscriptionPatientAssignments(Integer.parseInt(context.getParameter("sId")));

        return new AlreadyPaged<SubscriptionPatientAssignment>(context, subscriptionPatientList, false);
    }


    @Override
    public SimpleObject search(RequestContext context) throws ResponseException {
        if (context.getParameter("sId") == null) {
            throw new ConversionException("Required parameter:  subscriptionUuid");
        }
        List<SubscriptionPatientAssignment> subscriptionPatientList = Context
                .getService(SubscriptionManagementService.class)
                .getAllSubscriptionPatientAssignments(Integer.parseInt(context.getParameter("sId")));

        PageableResult result = new AlreadyPaged<SubscriptionPatientAssignment>(context, subscriptionPatientList, false);
        return result.toSimpleObject(this);
    }

    @Override
    public SubscriptionPatientAssignment getByUniqueId(String uniqueId) {
        return null;
    }

    @Override
    protected void delete(SubscriptionPatientAssignment delegate, String reason, RequestContext context) throws ResponseException {

    }

    @Override
    public SubscriptionPatientAssignment newDelegate() {
        return null;
    }

    @Override
    public SubscriptionPatientAssignment save(SubscriptionPatientAssignment delegate) {
        return null;
    }

    @Override
    public void purge(SubscriptionPatientAssignment delegate, RequestContext context) throws ResponseException {

    }
}
