$( function () {
  var svg = SVG( 'svgWrapper' ).size( 800, 600 ).viewbox( -400, -300, 800, 600 )
  var defs = svg.defs()

  var circle1 = defs.circle( 50 ).center( 0, 0 )
  var circle2 = defs.circle( 100 ).center( 0, 0 )

  var flag = true

  svg.use( circle1 ).move( 100, 100 ).click( function ( e ) {
    if ( flag ) {
      this.attr( 'href', '#' + circle2.attr( 'id' ) )
    } else {
      this.attr( 'href', '#' + circle1.attr( 'id' ) )
    }

    flag = !flag
  } )
  svg.use( circle1 ).move( -100, -100 ).click( function ( e ) {
    if ( flag ) {
      this.attr( 'href', '#' + circle2.attr( 'id' ) )
    } else {
      this.attr( 'href', '#' + circle1.attr( 'id' ) )
    }

    flag = !flag
  } )

  $.ajax({
    url: 'http://192.168.0.138:9880'
  }).done(function () {
    console.log(arguments)
  }).fail(function () {
    console.log(arguments)
  })
} )
