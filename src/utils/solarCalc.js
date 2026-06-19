export function calculateSunPosition(dateStr, timeStr) {
  const date = new Date(`${dateStr}T${timeStr}:00`);

  const latitude = 28.6139;
  const longitude = 77.209;

  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const declination =
    23.45 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 80));

  const [hours, minutes] = timeStr.split(":").map(Number);
  const timeCorrection = (longitude - 75) * 4;
  const solarTime = hours * 60 + minutes + timeCorrection;
  const hourAngle = (solarTime - 720) / 4;

  const latRad = (latitude * Math.PI) / 180;
  const declRad = (declination * Math.PI) / 180;
  const hrRad = (hourAngle * Math.PI) / 180;

  const sinElevation =
    Math.sin(latRad) * Math.sin(declRad) +
    Math.cos(latRad) * Math.cos(declRad) * Math.cos(hrRad);
  let elevation = Math.asin(sinElevation) * (180 / Math.PI);

  const cosAzimuth =
    (Math.sin(declRad) - Math.sin(latRad) * sinElevation) /
    (Math.cos(latRad) * Math.cos(Math.asin(sinElevation)));
  let azimuth = Math.acos(cosAzimuth) * (180 / Math.PI);

  if (hourAngle > 0) {
    azimuth = 360 - azimuth;
  }

  if (elevation < 0) elevation = 0;

  return {
    az: Math.round(azimuth * 100) / 100,
    el: Math.round(elevation * 100) / 100,
  };
}
