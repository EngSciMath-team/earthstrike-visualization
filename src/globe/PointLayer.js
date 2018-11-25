// import * as d3 from 'd3'
import Layer from './Layer.js'
import applyStyle from './utils/applyStyle.js'

export default class PointLayer extends Layer {
  draw (style) {
    this.drawn = true
    this.geometries = this.g.selectAll('circle')
      .data(this.features)
      .enter().append('circle')
      .attr('cx', feat => this.parent.projection(feat.geometry.coordinates)[0])
      .attr('cy', feat => this.parent.projection(feat.geometry.coordinates)[1])
      .attr('r', 1)
      .attr('fill', 'red')

    if (style) {
      this.setStyle(style)
    }
  }

  undraw () {
    this.g.selectAll('circle').remove()
  }

  setStyle (style) {
    this.style = style
    applyStyle(this.geometries, style)
  }

  update () {
    if (this.drawn) {
      this.geometries
        .attr('cx', feat => this.parent.projection(feat.geometry.coordinates)[0])
        .attr('cy', feat => this.parent.projection(feat.geometry.coordinates)[1])
    }
  }
}
