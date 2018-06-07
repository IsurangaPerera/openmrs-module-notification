export default class UrlHelper {
    originPath = () => window.location.origin;

    fullPath = () => window.location.pathname;

    owaPath = () => {
      const fullPath = window.location.pathname;
      return fullPath.substring(0, fullPath.lastIndexOf('/'));
    };

    apiBaseUrl = () => `${window.location.origin}/openmrs/ws/rest/v1`;
}