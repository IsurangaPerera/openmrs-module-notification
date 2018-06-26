package org.openmrs.module.notifications.service;

import org.openmrs.annotation.Authorized;
import org.openmrs.api.OpenmrsService;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface SubscriptionManagementService extends OpenmrsService {
	
	/**
	 * Save / update subscription
	 *
	 * @param subscription {@link Subscription}
	 * @return {@link Subscription}
	 */
	@Authorized(value = { "Edit Subscriptions" }, requireAll = true)
	Subscription saveSubscription(Subscription subscription);
	
	@Authorized(value = { "Get Subscriptions" }, requireAll = true)
	List<Subscription> getAllSubscriptions();

	@Authorized(value = { "Edit Subscriptions" }, requireAll = true)
	SubscriptionPatientAssignment saveSubscriptionPatientAssignment(SubscriptionPatientAssignment spa);
}
