package org.openmrs.module.notifications.entity;

import org.openmrs.BaseOpenmrsData;
import org.openmrs.Patient;

public class SubscribedPatient extends BaseOpenmrsData {
	
	private Integer id;
	
	private Patient patient;
	
	private Subscription subscription;
	
	@Override
	public Integer getId() {
		return id;
	}
	
	@Override
	public void setId(Integer id) {
		
	}
	
	public Patient getPatient() {
		return patient;
	}
	
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
	public Subscription getSubscription() {
		return subscription;
	}
	
	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}
}
