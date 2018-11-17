import actions from './actions.js'

export default function (context) {
  actions.forEach(action => action.attach(context))
}
