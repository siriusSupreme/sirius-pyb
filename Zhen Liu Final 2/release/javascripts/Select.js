function createSelect( id, options ) {
  var selectDom = document.createElement( 'select' )

  selectDom.id = id
  selectDom.classList.add( id )

  options = Array.isArray( options ) ? options : [ 'cooking steps', 'nutrition info' ]

  options.forEach( function ( option, index ) {
    selectDom.add( new Option( option ) )
  } )

  _Coordinate.containerDom.appendChild( selectDom )

  return selectDom
}
