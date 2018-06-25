package org.openmrs.module.notifications.rest.resource;

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
		
		Assert.assertEquals(1, results.size());
	}
}
