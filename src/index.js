import * as d3 from 'd3'
import Globe from './globe/Globe.js'
import PolygonLayer from './globe/PolygonLayer.js'
import mapActions from './actions/mapActions.js'

Promise.all([
  d3.json('static/110m.json'),
  d3.tsv('static/110m.tsv')
]).then(main)

function main ([countries, countryNames]) {
  const globe = new Globe({
    container: '#globe-container',
    width: window.innerWidth / 2,
    height: window.innerHeight,
    scale: 300,
    base: {
      attr: {
        class: 'base'
      }
    }
  })

  const countriesLayer = new PolygonLayer({
    type: 'topojson',
    file: countries,
    object: 'countries',
    attributes: countryNames,
    nameAttribute: 'sovereignt'
  })

  globe.add(countriesLayer)

  countriesLayer.draw({
    attr: {
      class: 'countries'
    }
  })

  globe.startRotating()

  let context = {
    globe,
    countriesLayer
  }

  mapActions(context)
}
