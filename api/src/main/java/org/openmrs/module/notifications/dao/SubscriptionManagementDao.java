package org.openmrs.module.notifications.dao;

import org.openmrs.User;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;

import java.util.List;

public interface SubscriptionManagementDao {
	
	/**
	 * Save / Update Subscription
	 *
	 * @param subscription {@link Subscription}
	 * @return {@link Subscription}
	 */
	Subscription saveSubscription(Subscription subscription);
	
	List getAllSubscriptions(User user);

    SubscriptionPatientAssignment saveSubscriptionPatientAssignment(SubscriptionPatientAssignment spa);
}
