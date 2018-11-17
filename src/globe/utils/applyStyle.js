export default function (target, options) {
  // Apply attrs if provided
  if (options.attr) {
    for (let key in options.attr) {
      target.attr(key, options.attr[key])
    }
  }

  // Apply styles if provided
  if (options.style) {
    for (let key in options.style) {
      target.style(key, options.style[key])
    }
  }
}
