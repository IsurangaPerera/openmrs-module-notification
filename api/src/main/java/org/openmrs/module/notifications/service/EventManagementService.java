package org.openmrs.module.notifications.service;

import org.openmrs.annotation.Authorized;
import org.openmrs.api.OpenmrsService;
import org.openmrs.module.notifications.entity.Event;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface EventManagementService extends OpenmrsService {
	
	/**
	 * Save / update Event
	 *
	 * @param event {@link Event}
	 * @return {@link Event}
	 */
	@Authorized(value = { "Edit Event" }, requireAll = true)
	Event saveEvent(Event event);
	
	@Authorized(value = { "Get Event" }, requireAll = true)
	List<Event> getAllEvents();
	
	@Authorized(value = { "Get Event" }, requireAll = true)
	Event getEventById(Integer id);

	@Authorized(value = { "Get Event" }, requireAll = true)
	Event getEventByUuid(String uuid);
}
