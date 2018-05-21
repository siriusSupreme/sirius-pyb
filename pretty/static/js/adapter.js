'use strict';

+function ( global, undefined ) {
  var baseFontSize=100;
  var designWidth=1920;

  var doc = global.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector( 'meta[name="viewport"]' );
  var resizeEvent = 'onorientationchange' in global ? 'onorientationchange' : 'resize';

  function recalculate () {
    var clientWidth = docEl.clientWidth;
    var dpr = global.devicePixelRatio || 1;
    var scale = 1 / dpr;

    if ( clientWidth ) {
      if ( !metaEl ) {
        metaEl = doc.createElement( 'meta' );
        metaEl.setAttribute( 'name', 'viewport' );
        doc.head.appendChild( metaEl );
      }
      metaEl.setAttribute( 'content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale );

      if ( clientWidth >= designWidth ) {
        docEl.style.fontSize = baseFontSize+'px';
      } else {
        docEl.style.fontSize = baseFontSize * (clientWidth / designWidth) + 'px';
      }
    }

  }

  if ( doc.addEventListener ) {
    recalculate();
    global.addEventListener( resizeEvent, recalculate, false );
    doc.addEventListener( 'DOMContentLoaded', recalculate, false );
  }

}( window || this );
