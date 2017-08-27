'use strict';

module.exports = {
  icon(fillColor, scale = .5) {
    return {
      scale,
      fillColor,
      fillOpacity: 1,
      path       : `M47 49c-.952 0-1.884-.22-2.705-.597-.843-.397-1.795-.63-2.794-.63-.986 0-1.938.232-2.781.63-.834.377-1.756.597-2.718.597-.954 0-1.884-.22-2.708-.597-.841-.397-1.795-.63-2.792-.63-.987 0-1.939.232-2.785.63-.828.377-1.754.597-2.712.597-.964 0-1.884-.22-2.712-.597-.843-.397-1.797-.63-2.787-.63-.997 0-1.951.232-2.794.63-.823.377-1.748.597-2.713.597-.958 0-1.884-.22-2.71-.597-.844-.397-1.797-.63-2.789-.63-.992 0-1.945.232-2.789.63-.827.377-1.747.597-2.711.597v-4.102c.964 0 1.884-.22 2.711-.597.844-.387 1.797-.619 2.789-.619.991 0 1.944.232 2.789.619.827.377 1.752.597 2.71.597.965 0 1.89-.22 2.712-.597.843-.387 1.797-.619 2.794-.619.99 0 1.944.232 2.787.619.829.377 1.748.597 2.712.597.958 0 1.884-.22 2.712-.597.846-.387 1.798-.619 2.785-.619.997 0 1.951.232 2.792.619.824.377 1.754.597 2.708.597.962 0 1.884-.22 2.718-.597.843-.387 1.795-.619 2.781-.619.999 0 1.951.232 2.794.619.821.377 1.753.597 2.705.597v4.102zm-18-48v31h-24.713zm3 7.119c0 3.461 15.847 12.881 14.693 23.881h-14.693v-23.881zm11.527 25.881h-33.527v6.2c1 .1.846.211 1.187.377.827.365 1.804.585 2.762.585.965 0 1.916-.22 2.738-.585.843-.398 1.81-.63 2.807-.63.99 0 1.95.231 2.793.63.829.365 1.751.585 2.715.585.958 0 1.885-.22 2.713-.585.846-.398 1.799-.63 2.786-.63.997 0 1.952.231 2.793.63.824.365 1.754.585 2.708.585.187 0 .36-.044.536-.066l.045.022.328-.055c.219-.033.437-.056.657-.11 1.97-.409 3.244-2.006 3.244-2.006l3.835-4.947h-1.12z`
    }
  },

  render(obj) {
    const buf = [ '<dl>' ];
    for (let k in obj) {
      if (obj.hasOwnProperty(k) && obj[ k ] != null)
        buf.push(`<dt class="${ k }">${ k }</dt><dd>${ obj[ k ] }</dd>`);
    }
    buf.push(`</dl>`);
    return buf.join('');
  }
}

