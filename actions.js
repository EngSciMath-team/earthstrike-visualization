import Action from './Action.js'

const zoomToAustralia = new Action({
  trigger: 'click',
  id: 'zoomToAustralia',
  func: ({ globe }) => {
    globe.stopRotating()
    globe.rotateTo([134.2743662, -26.4614544]).then(() => {
      globe.zoom(3.6)
    })
  }
})

const zoomToStartPosition = new Action({
  trigger: 'click',
  id: 'zoomToStartPosition',
  func: ({ globe }) => {
    globe.zoom(1).then(() => {
      globe.rotateTo([0, 0]).then(() => {
        globe.startRotating()
      })
    })
  }
})

const highlightUS = new Action({
  trigger: 'click',
  id: 'highlightUS',
  func: ({ countriesLayer }) => {
    countriesLayer.highlight('United States of America', {
      attr: {
        class: 'highlighted-country-blink'
      }
    })
  }
})

const unHighlightUS = new Action({
  trigger: 'click',
  id: 'unHighlightUS',
  func: ({ countriesLayer }) => {
    countriesLayer.unHighlight('United States of America')
  }
})

const showWorldPop = new Action({
  trigger: 'click',
  id: 'showWorldPop',
  func: ({ populationLayer }) => {
    populationLayer.undraw()
    populationLayer.draw({
      attr: {
        class: 'population-centers'
      }
    })
  }
})

const hideWorldPop = new Action({
  trigger: 'click',
  id: 'hideWorldPop',
  func: ({ populationLayer }) => {
    populationLayer.undraw()
  }
})

export default [
  zoomToAustralia,
  zoomToStartPosition,
  highlightUS,
  unHighlightUS,
  showWorldPop,
  hideWorldPop
]
