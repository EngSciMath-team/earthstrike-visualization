import * as d3 from 'd3'
import Layer from './Layer.js'
import applyStyle from './utils/applyStyle.js'

export default class PolygonLayer extends Layer {
  draw (style) {
    this.drawn = true
    this.geometries = this.g.selectAll('path')
      .data(this.features)
      .enter().append('path')
      .attr('d', this.parent.path)
      .attr('id', (d, index) => `${this.id}-${index}`)

    if (style) {
      this.setStyle(style)
    }
  }

  setStyle (style) {
    this.style = style
    applyStyle(this.geometries, style)
  }

  highlight (name, style) {
    let index = this.nameToIndex[name]
    let polygon = d3.select(`[id="${this.id}-${index}"]`)
    applyStyle(polygon, style)
  }

  unHighlight (name) {
    let index = this.nameToIndex[name]
    let polygon = d3.select(`[id="${this.id}-${index}"]`)
    applyStyle(polygon, this.style)
  }

  update () {
    if (this.drawn) {
      this.geometries.attr('d', this.parent.path)
    }
  }
}
