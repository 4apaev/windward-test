'use strict';

const flags = require('./flags.json');
const infos = require('./vesselinfo.json');
const locations = require('./vesselloc.json');

const vessels = locations.map(loc => {
  let id = loc._id;
  let info = infos.find(x => x._id===id);
  return combineVesselData(id, loc, info);
})

function combineVesselData(id, loc, info={}) {
  const [ lng,lat ] = loc.lastpos.geometry.coordinates;
  const {
    size=0,
    buildYear=0,
    service_speed=0,
    vessel_class,
    vessel_type=vessel_class||'unknown',
    name='unknown',
    flag=''
  } = info;

  return {
    id,
    lat,
    lng,
    size,
    name,
    flag: flags[ flag.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() ]||'',
    type: vessel_type,
    built: buildYear,
    speed: service_speed
  }

}

module.exports = {
  infos,
  locations,
  vessels
}
