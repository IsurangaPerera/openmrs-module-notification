package org.openmrs.module.notifications;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openmrs.api.APIAuthenticationException;
import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.service.EventManagementService;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@org.springframework.test.context.ContextConfiguration(locations = {
        "classpath:TestingApplicationContext.xml" }, inheritLocations = true)
public class EventManagementServiceTest extends BaseModuleWebContextSensitiveTest {
	
	private String superUser;
	
	private String superUserPassword;
	
	private String normalUser;
	
	private String normalUserPassword;
	
	@Before
	public void setUp() throws Exception {
		superUser = "test-user";
		superUserPassword = "test";
		normalUser = "normal-user";
		normalUserPassword = "normal-password";
		executeDataSet("SubscriptionManagementDAOComponentTestDataset.xml");
	}
	
	@Test
	public void shouldPassIfUserHasGetEventPrivilege() {
		Context.authenticate(superUser, superUserPassword);
		
		EventManagementService eventManagementService = Context.getService(EventManagementService.class);
		
		assertNotNull(eventManagementService.getAllEvents());
	}
	
	@Test(expected = APIAuthenticationException.class)
	public void shouldThrowAuthenticationExceptionIfUserDoesNoGetEventPrivilege() {
		Context.authenticate(normalUser, normalUserPassword);
		
		EventManagementService eventManagementService = Context.getService(EventManagementService.class);
		
		assertNotNull(eventManagementService.getAllEvents());
	}
}
