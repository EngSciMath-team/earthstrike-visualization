import * as d3 from 'd3'
import Globe from './globe/Globe.js'
import PolygonLayer from './globe/PolygonLayer.js'
// import PointLayer from './globe/PointLayer.js'
import mapActions from './actions/mapActions.js'

Promise.all([
  d3.json('static/json/110m.json'),
  d3.tsv('static/csv/110m.tsv'),
  d3.json('static/json/population-centers.geojson')
]).then(main)

function main ([countries, countryNames, popCenters]) {
  const globe = new Globe({
    svg: '#globe',
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

  const populationLayer = new PolygonLayer({
    type: 'geojson',
    file: popCenters
  })

  globe.add(countriesLayer)
  globe.add(populationLayer)

  countriesLayer.draw({
    attr: {
      class: 'countries'
    }
  })

  globe.startRotating()

  let context = {
    globe,
    countriesLayer,
    populationLayer
  }

  mapActions(context)
}
