'use strict';

const { PI, cos, sin, acos, sqrt, random } = Math;
const RAD = PI / 180;
const LND = 111132.954; // meters of 1° of lat
const ER = 6367449; // Radius of the Earth in m

const deg2rad = x => x * RAD;
const rad2deg = x => x / RAD;
const toDecimalDeg = (d, m, s) => d + m / 60 + s / 3600;
const toDegMinSec = (deg) => {
  let d = 0 | deg,
    r = deg - d,
    m = 0 | 60 * r,
    s = 3600 * r - 60 * m;
  return [ d, m, s ]
}

function randPoint({ lat, lng }, radius = 1000) {
  const r = radius / LND,
    w = r * sqrt(random()),
    t = 2 * PI * random(),
    x = w * cos(t);
  lat += w * sin(t);
  lng += x / cos(lat);
  return { lat, lng };
}

function diff(lat1, lng1, lat2, lng2) {
  let A = deg2rad(lat1),
    B = deg2rad(lat2),
    C = deg2rad(lng2 - lng1),
    D = sin(A) *
      sin(B) +
      cos(A) *
      cos(B) *
      cos(C);
  return acos(D) * ER;
}

module.exports = { diff, randPoint, deg2rad, rad2deg, toDecimalDeg, toDegMinSec }