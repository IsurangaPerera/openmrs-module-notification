package org.openmrs.module.notifications.dao;

import org.openmrs.User;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.entity.Subscription;

import java.util.List;

public interface EventManagementDao {
	
	/**
	 * Save / Update Event
	 *
	 * @param event {@link Event}
	 * @return {@link Event}
	 */
	Event saveEvent(Event event);
	
	List getAllEvents();
	
	Event getEventById(Integer Id);
}
