// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uploadPostUrl: 'https://newszoid.stackroute.io:8443/content-service/api/v1/post',
  registerUrl: 'https://newszoid.stackroute.io:8443/registration-service/api/v1/register',
  loginUrl: 'https://newszoid.stackroute.io:8443/login-service/api/v1/authenticate',
  postTargetUrl: 'https://newszoid.stackroute.io:8443/content-service/api/v1/file/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
