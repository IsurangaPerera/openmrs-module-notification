package org.openmrs.module.notifications.dao.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.openmrs.User;
import org.openmrs.module.notifications.dao.SubscriptionManagementDao;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.entity.SubscriptionPatientAssignment;

import java.util.List;

public class



SubscriptionManagementDaoImpl implements SubscriptionManagementDao {
	
	SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public Subscription saveSubscription(Subscription subscription) {
		Session session = this.sessionFactory.getCurrentSession();
		session.saveOrUpdate(subscription);
		session.flush();
		return subscription;
	}
	
	@Override
	public List<Subscription> getAllSubscriptions(User user) {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("from Subscription where user_id =:uid").setParameter("uid", user.getId()).list();
	}

	@Override
	public SubscriptionPatientAssignment saveSubscriptionPatientAssignment(SubscriptionPatientAssignment spa) {
		Session session = this.sessionFactory.getCurrentSession();
		session.saveOrUpdate(spa);
		session.flush();
		return spa;
	}
}
