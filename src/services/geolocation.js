export function getCurrentPosition(options = { timeout: 10000, maximumAge: 10 * 60 * 1000 }) {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location access was denied."
            : "Could not get your location.";
        reject(new Error(message));
      },
      options,
    );
  });
}
