const Geo = require('./geo');
const Templates = require('./templates');

module.exports = class App {

  init(position = { lat: 0, lng: 0 }) {
    const el = $('map')

    const map = this.map = new google.maps.Map(el, {
      zoom  : 4,
      center: position
    });

    this.marker = new google.maps.Marker({
      map,
      position,
      draggable: true
    });

    $('biggest').addEventListener('click', this.biggest.bind(this))

    el.addEventListener('change', ({ target }) => {
      if (target.matches('input.ship')) {
        let obj = this.find(target.dataset.id)
        if (obj) {

          obj.vessel[ target.name ] = target.value
          fetch('/vessels', {
            method: 'POST',
            body  : JSON.stringify(obj.vessel)
          })
            .then(x => x.json())
            .then(x => log(x))
        }
      }
    })

    this.marker.addListener('dragend', () => this.nearBy($('radius').value * 1000));

    this.fetch().then(vessels => {
      this.vessels = vessels;
      this.group();
    });
  }

  group(maxZoom = 6, gridSize = maxZoom) {
    this.mc = new MarkerClusterer(this.map, this.vessels, {
      imagePath: '/css/m',
      gridSize,
      maxZoom
    });
  }

  fetch() {
    const { map } = this;
    const icon = Templates.icon('seagreen');

    return fetch('/vessels').then(x => x.json()).then(vessels => vessels.map(vessel => {
      const marker = new google.maps.Marker({
        map,
        icon,
        position: {
          lat: vessel.lat,
          lng: vessel.lng
        },
      });

      const info = new google.maps.InfoWindow({
        content: Templates.render(vessel)
      });

      marker.addListener('click', () => {
        let obj = this.find(vessel.id)
        obj && info.setContent(Templates.render(obj.vessel))
        info.open(map, marker)
      });
      marker.vessel = vessel;
      return marker;
    }))
  }

  nearBy(radius) {
    const { lat, lng } = this.position;
    this.vessels.forEach(mark => {
      const color = Geo.diff(mark.vessel.lat, mark.vessel.lng, lat, lng) < radius
        ? 'magenta'
        : 'seagreen';
      mark.setIcon(Templates.icon(color));
    })
  }

  biggest() {
    let mark = this.vessels.reduce((a, b) => !a || a.vessel.size < b.vessel.size ? b : a);
    if (mark) {
      mark.setIcon(Templates.icon('orange', 1));
      mark.setZIndex(999);
      this.map.setCenter(mark.position.toJSON());
      this.map.setZoom(8);
    }
  }

  find(id) {
    return this.vessels.find(x => x.vessel.id === id);
  }

  get position() {
    return this.marker.position.toJSON();
  }
}

