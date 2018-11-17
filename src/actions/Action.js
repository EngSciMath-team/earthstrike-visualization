import * as d3 from 'd3'

export default class Action {
  constructor (options) {
    this.trigger = options.trigger
    this.id = options.id
    this.func = options.func
  }

  attach (context) {
    this.element = d3.select(
      `[action-${this.trigger}="${this.id}"]`
    )

    if (this.trigger === 'click') {
      this.element.on(this.trigger, () => this.func(context))
    }
  }
}
