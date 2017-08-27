'use strict';


const flags = require('./flags.json')
const infos = require('./vesselinfo.json')
const locations = require('./vesselloc.json')

const vessels = locations.map(loc => {
  let id = loc._id
  let info = infos.find(x => x._id===id)
  return combineVesselData(id, loc, info)
})


function combineVesselData(id, loc, info={}) {
  const [ lng,lat ] = loc.lastpos.geometry.coordinates
  const { name, callsign, owner, vessel_class, vessel_type, size, flag } = info
  return {
    id,
    lat,
    lng,
    size,
    owner,
    callsign,
    flag: flags[ flag ]||flag,
    class: vessel_class,
    type: vessel_type,
  }
}

module.exports = {
  info: JSON.stringify(infos, 0, 2),
  location: JSON.stringify(locations, 0, 2),
  vessels: JSON.stringify(vessels, 0, 2),
}