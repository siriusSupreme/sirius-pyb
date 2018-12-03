SVG.on( document, 'DOMContentLoaded', function ( e ) {
  var svg = SVG( 'menu' ).size( Coordinate.width, Coordinate.height )

  var frame = new _Frame( 0, 0, '100%', '100%' )

  frame.draw( svg, 12, {
    stroke: '#000000',
    fill: '#F0FFFF',
  } )
} )
