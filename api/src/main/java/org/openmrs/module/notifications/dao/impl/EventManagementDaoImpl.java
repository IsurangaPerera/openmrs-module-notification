package org.openmrs.module.notifications.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.openmrs.module.notifications.dao.EventManagementDao;
import org.openmrs.module.notifications.entity.Event;

import java.util.List;

public class EventManagementDaoImpl implements EventManagementDao {
	
	SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public Event saveEvent(Event event) {
		Session session = this.sessionFactory.getCurrentSession();
		session.saveOrUpdate(event);
		session.flush();
		return event;
	}
	
	@Override
	public List getAllEvents() {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("from Event").list();
	}
	
	@Override
	public Event getEventById(Integer Id) {
		String hql = "from Event " + "where id=:Id";
		
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("Id", Id);
		return (Event) query.uniqueResult();
	}
}
