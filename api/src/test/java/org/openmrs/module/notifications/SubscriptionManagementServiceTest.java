package org.openmrs.module.notifications;

import org.hibernate.cfg.Configuration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openmrs.Patient;
import org.openmrs.api.APIAuthenticationException;
import org.openmrs.api.LocationService;
import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Set;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@org.springframework.test.context.ContextConfiguration(locations = { "classpath:TestingApplicationContext.xml" })
public class SubscriptionManagementServiceTest extends BaseModuleWebContextSensitiveTest {
	
	private String superUser;
	
	private String superUserPassword;
	
	private String normalUser;
	
	private String normalUserPassword;
	
	private String name;
	
	private String description;
	
	private Set<Patient> patients;
	
	private Event event;
	
	private Integer oid;
	
	@Autowired
	private LocationService locationService;
	
	@Before
	public void setUp() throws Exception {
		superUser = "test-user";
		superUserPassword = "test";
		normalUser = "normal-user";
		normalUserPassword = "normal-password";
		executeDataSet("SubscriptionManagementDAOComponentTestDataset.xml");
		// patient = Context.getPatientService().getPatient(3);
		// location = Context.getLocationService().getLocation(12347);
		// encounter = Context.getEncounterService().getEncounter(2);
		// bedNumber = "11";
	}
	
	@Test
	public void shouldPassIfUserHasGetAdmissionLocationsPrivilege() {
		Context.authenticate(superUser, superUserPassword);
		
		SubscriptionManagementService subscriptionManagementService = Context
		        .getService(SubscriptionManagementService.class);
		
		assertNull(subscriptionManagementService.getAllSubscriptions());
	}
	
	@Test(expected = APIAuthenticationException.class)
	public void shouldThrowAuthenticationExceptionIfUserDoesNotHaveGetAdmissionLocationsPrivilege() {
		Context.authenticate(normalUser, normalUserPassword);
		
		SubscriptionManagementService subscriptionManagementService = Context
		        .getService(SubscriptionManagementService.class);
		
		subscriptionManagementService.getAllSubscriptions();
	}
}
