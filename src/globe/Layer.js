import * as topojson from 'topojson'

// This class is not supposed to be used directly, it is only extended
export default class Layer {
  constructor (options) {
    this.parent = null
    this.g = null

    // Generate unique id
    this.id = 'd' + Math.random().toString().replace('0.', '')

    // If a topojson file is passed
    if (options.type === 'topojson') {
      let file = options.file
      let geojson = topojson.feature(file, file.objects[options.object])
      this.features = geojson.features
    }

    // If a geojson file is passed
    if (options.type === 'geojson') {
      let file = options.file
      this.features = file.features
    }

    // If a csv file is passed
    if (options.type === 'csv') {
      this.features = []
      options.file.forEach((row, i) => {
        let x = +row[options.x ? options.x : 'x']
        let y = +row[options.y ? options.y : 'y']

        let properties = {}

        if (options.properties) {
          for (let property of options.properties) {
            properties[property] = row[property]
          }
        }

        this.features.push({
          type: 'Feature',
          id: i.toString(),
          geometry: {
            type: 'Point',
            coordinates: [x, y]
          },
          properties
        })
      })
    }

    // Add attribute data
    if (options.attributes) {
      this.attributes = options.attributes

      if (options.nameAttribute) {
        this.nameToIndex = {}
        this.indexToName = {}

        for (let i = 0; i < this.features.length; i++) {
          let name = this.attributes[i][options.nameAttribute]
          this.nameToIndex[name] = i
          this.indexToName[i] = name
        }
      }
    }
  }
}
