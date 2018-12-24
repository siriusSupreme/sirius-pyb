$( function () {
	var svg = SVG( 'svgWrapper' )
		.size( 800, 600 )
		.viewbox( -400, -300, 800, 600 )
	var defs = svg.defs()

	var circle1 = defs.circle( 50 ).center( 0, 0 )
	var circle2 = defs.circle( 100 ).center( 0, 0 )

	var flag = true

	svg
		.use( circle1 )
		.move( 100, 100 )
		.click( function ( e ) {
			if ( flag ) {
				this.attr( 'href', '#' + circle2.attr( 'id' ) )
			} else {
				this.attr( 'href', '#' + circle1.attr( 'id' ) )
			}

			flag = !flag
			console.log( this.position() )
		} )

	svg
		.use( circle1 )
		.move( -100, -100 )
		.click( function ( e ) {
			if ( flag ) {
				this.attr( 'href', '#' + circle2.attr( 'id' ) )
			} else {
				this.attr( 'href', '#' + circle1.attr( 'id' ) )
			}

			flag = !flag

			// this.front()
			this.forward()
			// this.back()
			// this.backward()
		} )

	svg
		.use( circle1 )
		.move( 0, 0 )
		.click( function ( e ) {
			console.log( this.visible() )
			console.log( this )

			console.log( this.id() )
			console.log( this.bbox() )
			console.log( this.rbox() )
			console.log( this.svg() )
			console.log( this.position() )

			this.flip( 'x' )

			// this.hide()

			// console.log( this.visible() )
			// console.log( this )
		} )
} )
