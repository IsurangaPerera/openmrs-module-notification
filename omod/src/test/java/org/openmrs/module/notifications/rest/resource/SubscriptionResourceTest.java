package org.openmrs.module.notifications.rest.resource;

import org.apache.commons.beanutils.PropertyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

public class SubscriptionResourceTest extends MainResourceControllerTest {
	
	private String superUser;
	
	private String superUserPassword;
	
	@Before
	public void init() throws Exception {
		superUser = "test-user";
		superUserPassword = "test";
		executeDataSet("SubscriptionManagementDAOComponentTestDataset.xml");
	}
	
	@Override
	public String getURI() {
		return "notification";
	}
	
	@Override
	public String getUuid() {
		return "bb12c454-d225-11e4-9c67-080027b662ec";
	}
	
	@Override
	public long getAllCount() {
		return 0;
	}
	
	@Test
	public void shouldReturnAllSubscriptions() throws Exception {
		Context.authenticate(superUser, superUserPassword);
		MockHttpServletRequest request = request(RequestMethod.GET, getURI());
		SimpleObject object = deserialize(handle(request));
		
		List results = (ArrayList) object.get("results");
		
		Assert.assertEquals(3, results.size());
	}
	
	@Test
	public void shouldAddSubscription() throws Exception {
		Context.authenticate(superUser, superUserPassword);
		MockHttpServletRequest request = request(RequestMethod.POST, getURI());
		SimpleObject postParameters = new SimpleObject();
		postParameters.put("name", "ART Patient Visit Alert");
		postParameters.put("description", "ART Patient Visit Alert");
		postParameters.put("eventId", "1");
		postParameters.put("patients", "{\"1\":\"3\", \"4\":\"5\"}");
		String json = new ObjectMapper().writeValueAsString(postParameters);
		request.setContent(json.getBytes());
		SimpleObject subscription = deserialize(handle(request));
		System.out.println(subscription.toString());
		
		Assert.assertEquals("event01", PropertyUtils.getProperty(subscription.get("event"), "name"));
		Assert.assertEquals("test-user", PropertyUtils.getProperty(subscription.get("user"), "username"));
		
	}
}
