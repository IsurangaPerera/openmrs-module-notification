package org.openmrs.module.notifications.entity;

import org.openmrs.BaseOpenmrsData;
import org.openmrs.Patient;

import java.util.Set;

public class Subscription extends BaseOpenmrsData {
	
	private Integer id;
	
	private String name;
	
	private String description;
	
	private Set<Patient> patients;
	
	private Event event;
	
	private Integer oid;
	
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
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Set<Patient> getPatients() {
		return patients;
	}
	
	public void setPatients(Set<Patient> patients) {
		this.patients = patients;
	}
	
	public Event getEvent() {
		return event;
	}
	
	public void setEvent(Event event) {
		this.event = event;
	}
	
	public Integer getOwner() {
		return oid;
	}
	
	public void setOwner(Integer oid) {
		this.oid = oid;
	}
}
