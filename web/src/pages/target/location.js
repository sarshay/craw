export function getUserGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          reject("Unable to retrieve your location");
        }
      );
    }
  });
}
export function checkGeolocationPermission() {
  return new Promise((resolve, reject) => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        resolve(permissionStatus.state);
      })
      .catch((error) => {
        reject("Error checking geolocation permission");
      });
  });
}
