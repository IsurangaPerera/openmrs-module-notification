package org.openmrs.module.notifications;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openmrs.api.APIAuthenticationException;
import org.openmrs.api.context.Context;
import org.openmrs.module.notifications.entity.Event;
import org.openmrs.module.notifications.entity.Subscription;
import org.openmrs.module.notifications.service.EventManagementService;
import org.openmrs.module.notifications.service.SubscriptionManagementService;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@org.springframework.test.context.ContextConfiguration(locations = {
        "classpath:TestingApplicationContext.xml" }, inheritLocations = true)
public class SubscriptionManagementServiceTest extends BaseModuleWebContextSensitiveTest {
	
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
	public void shouldPassIfUserHasGetEditSubscriptionsPrivilege() {
		Context.authenticate(superUser, superUserPassword);
		
		SubscriptionManagementService subscriptionManagementService = Context
		        .getService(SubscriptionManagementService.class);
		
		assertNotNull(subscriptionManagementService.getAllSubscriptions());
	}
	
	@Test(expected = APIAuthenticationException.class)
	public void shouldThrowAuthenticationExceptionIfUserDoesNotHaveEditSubscriptionsPrivilege() {
		Context.authenticate(normalUser, normalUserPassword);
		
		SubscriptionManagementService subscriptionManagementService = Context
		        .getService(SubscriptionManagementService.class);
		
		subscriptionManagementService.getAllSubscriptions();
	}
	
	@Test
	public void shouldReturnAllSubscriptions() throws Exception {
		Context.authenticate(superUser, superUserPassword);
		
		List<Subscription> allSubscriptions = Context.getService(SubscriptionManagementService.class).getAllSubscriptions();
		Assert.assertEquals(3, allSubscriptions.size());
	}
	
	@Test
	public void shouldSaveSubscription() {
		Context.authenticate(superUser, superUserPassword);
		
		Event event = Context.getService(EventManagementService.class).getEventById(1);
		
		Subscription subscription = new Subscription();
		subscription.setName("Lab Report Arrival");
		subscription.setDescription("Lab Report Arrival");
		subscription.setEvent(event);
		subscription.setUser(Context.getAuthenticatedUser());
		subscription.setVoided(false);
		
	}
}
