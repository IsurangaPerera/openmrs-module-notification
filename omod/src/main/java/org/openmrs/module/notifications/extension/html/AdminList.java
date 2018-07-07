package org.openmrs.module.notifications.extension.html;

import org.openmrs.module.Extension;
import org.openmrs.module.notifications.constants.SubscriptionManagementProperties;
import org.openmrs.module.web.extension.AdministrationSectionExt;

import java.util.LinkedHashMap;
import java.util.Map;

public class AdminList extends AdministrationSectionExt {

    public Extension.MEDIA_TYPE getMediaType() {
        return Extension.MEDIA_TYPE.html;
    }

    public String getTitle() {
        return "Notifications";
    }

    /**
     * @see AdministrationSectionExt#getLinks()
     */
    public Map<String, String> getLinks() {
        LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
        String appBaseUrl = SubscriptionManagementProperties.getProperty("appBaseUrl");
        map.put(appBaseUrl + "/openmrs-module-notification/index.html", "Manage Subscriptions");
        return map;
    }
}
