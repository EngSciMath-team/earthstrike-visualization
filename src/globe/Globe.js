import * as d3 from 'd3'
import applyStyle from './utils/applyStyle.js'

// http://bl.ocks.org/KoGor/5994804

export default class Globe {
  constructor (options) {
    // Initalize dimensions
    this.width = options.width
    this.height = options.height
    this.center = [this.width / 2, this.height / 2]
    this.rotation = [0, 0, 0]
    this.scale = options.scale
    this.zoomScale = 1

    // Initialize projection and path
    this._updateProjection()

    // Initialize SVG container
    this.svg = d3.select(options.svg)
      .attr('width', this.width)
      .attr('height', this.height)

    this.g = this.svg.append('g')

    // Initialize layers
    this.layers = []

    // Set base layer if necessary
    if (options.base) {
      this._setBase(options.base)
    }
  }

  // Adds a layer to globe
  add (layer) {
    layer.parent = this
    layer.g = this.g
      .append('g')
      .attr('width', this.width)
      .attr('height', this.height)

    this.layers.push(layer)
  }

  startRotating (speed = 0.3) {
    this._rotating = true
    this._rotationSpeed = speed
    window.requestAnimationFrame(this._rotate.bind(this))
  }

  stopRotating () {
    this._rotating = false
  }

  rotateTo ([x, y], time = 500) {
    return new Promise((resolve, reject) => {
      d3.transition()
        .duration(time)
        .tween('rotate', () => {
          let r = d3.interpolate(this.projection.rotate(), [-x, -y])

          return t => {
            let newProj = r(t)

            this.rotation = newProj
            this.projection.rotate(newProj)
            this._updateLayers()

            if (t === 1) {
              resolve()
            }
          }
        })
    })
  }

  zoom (scale, time = 500) {
    return new Promise((resolve, reject) => {
      d3.transition()
        .duration(time)
        .tween('zoom', () => {
          let r = d3.interpolate(this.zoomScale, scale)

          return t => {
            this.zoomScale = r(t)
            this._updateProjection()
            this._updateLayers()

            if (t === 1) {
              resolve()
            }
          }
        })
    })
  }

  _updateProjection () {
    this.projection = d3.geoOrthographic()
      .scale(this.scale * this.zoomScale)
      .rotate(this.rotation)
      .translate([this.width / 2, this.height / 2])
      .clipAngle(90)

    this.path = d3.geoPath(this.projection)
  }

  _updateLayers () {
    this.layers.forEach(layer => layer.update())
    this.base.attr('d', this.path)
  }

  _setBase (baseStyle) {
    this.g.append('path')
      .datum({ type: 'Sphere' })
      .attr('d', this.path)
      .attr('id', 'base')

    this.base = d3.select('#base')

    // Apply styles
    applyStyle(this.base, baseStyle)
  }

  _rotate () {
    this.rotation[0] = this.rotation[0] + this._rotationSpeed

    if (this.rotation[0] > 360) {
      this.rotation[0] = Math.round((this.rotation[0] - 360) * 100) / 100
    }

    this._updateLayers()
    this._updateProjection()

    if (this._rotating) {
      window.requestAnimationFrame(this._rotate.bind(this))
    }
  }
}
