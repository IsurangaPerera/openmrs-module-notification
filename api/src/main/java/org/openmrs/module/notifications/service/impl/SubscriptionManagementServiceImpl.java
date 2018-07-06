package org.openmrs.module.notifications.service.impl;

import org.openmrs.api.context.Context;
import org.openmrs.api.impl.BaseOpenmrsService;
import org.openmrs.module.notifications.dao.SubscriptionManagementDao;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;
import org.openmrs.module.notifications.service.SubscriptionManagementService;

import java.util.List;

public class SubscriptionManagementServiceImpl extends BaseOpenmrsService implements SubscriptionManagementService {
	
	private SubscriptionManagementDao subscriptionManagementDao;
	
	public void setDao(SubscriptionManagementDao dao) {
		this.subscriptionManagementDao = dao;
	}
	
	@Override
	public Subscription saveSubscription(Subscription subscription) {
		return subscriptionManagementDao.saveSubscription(subscription);
	}
	
	@Override
	public List<Subscription> getAllSubscriptions() {
		return subscriptionManagementDao.getAllSubscriptions(Context.getAuthenticatedUser());
	}

	@Override
	public SubscriptionPatientAssignment saveSubscriptionPatientAssignment(SubscriptionPatientAssignment spa) {
		return subscriptionManagementDao.saveSubscriptionPatientAssignment(spa);
	}

	@Override
	public Subscription getSubscriptionByUuid(String uuid) {
		return subscriptionManagementDao.getSubscriptionByUuid(uuid);
	}

    @Override
    public List<SubscriptionPatientAssignment> getAllSubscriptionPatientAssignments(Integer sId) {
        return subscriptionManagementDao.getAllSubscriptionPatientAssignments(sId);
    }

	@Override
	public void deleteSubscriptionPatientAssignment(Integer sId) {
		subscriptionManagementDao.deleteAllSubscriptionPatientAssignments(sId);
	}
}
