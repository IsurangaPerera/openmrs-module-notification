package org.openmrs.module.notifications.entity;

import org.openmrs.BaseOpenmrsData;
import org.openmrs.User;

import java.util.Set;

public class Subscription extends BaseOpenmrsData {
	
	private Integer id;
	
	private String name;
	
	private String description;
	
	private Set<SubscriptionPatientAssignment> subscriptionPatientAssignment;
	
	private Event event;
	
	private User user;
	
	@Override
	public Integer getId() {
		return id;
	}
	
	@Override
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Set<SubscriptionPatientAssignment> getSubscriptionPatientAssignment() {
		return subscriptionPatientAssignment;
	}
	
	public void setSubscriptionPatientAssignment(Set<SubscriptionPatientAssignment> subscriptionPatientAssignment) {
		this.subscriptionPatientAssignment = subscriptionPatientAssignment;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Event getEvent() {
		return event;
	}
	
	public void setEvent(Event event) {
		this.event = event;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}
