package org.openmrs.module.notifications.service.impl;

import org.openmrs.api.impl.BaseOpenmrsService;
import org.openmrs.module.notifications.dao.EventManagementDao;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.service.EventManagementService;

import java.util.List;

public class EventManagementServiceImpl extends BaseOpenmrsService implements EventManagementService {
	
	private EventManagementDao eventManagementDao;
	
	public void setDao(EventManagementDao dao) {
		this.eventManagementDao = dao;
	}
	
	@Override
	public Event saveEvent(Event event) {
		return eventManagementDao.saveEvent(event);
	}
	
	@Override
	public List<Event> getAllEvents() {
		return eventManagementDao.getAllEvents();
	}
	
	@Override
	public Event getEventById(Integer id) {
		return eventManagementDao.getEventById(id);
	}
}
