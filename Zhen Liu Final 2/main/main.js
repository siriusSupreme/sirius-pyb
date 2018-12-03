/*Zhen Liu, 10/29/2018 Week6,draft*/


var draw = SVG( 'output' ).size( 2000, 1000 );


var dishtext;

alert( "Welcome to Taste World" )


function parameter( x, y, c1, c2 ) {
  var r1 = 50;
  var background = draw.rect( 300, 500 ).radius( 10 ).fill( c1 ).stroke( {
    width: 2
  } ).move( x, y );


  var brand = draw.rect( 150, 80 ).fill( 'white' ).stroke( {
    width: 2
  } ).move( x + 75, y + 85 );


  var Button = draw.circle( 100 );

  //.fill(c2).stroke({width: 2}).move(x +105, y + 235)
  var brandText = draw.text( "T A S T E\n" ).move( x + 120, y + 120 );
  var startText = draw.text( "Start\n" ).move( x + 135, y + 295 ).on( 'click', interface2 );

  var cx = r1 + x + 105,
    cy = r1 + y + 255;
  $( 'circle' )[ 0 ].outerHTML = '<circle id="SvgjsCircle1010" r="' + r1 + '" cx="' + cx + '" cy="' + cy + '" fill="#fff0f5" stroke="#666" stroke-width="5"></circle>'

  function interface2() {
    var value = document.querySelector( 'input' ).value;
    console.log( value )
    document.querySelector( 'input' ).style.display = 'block';

    var background2 = draw.rect( 300, 500 ).radius( 10 ).fill( c1 ).stroke( {
      width: 2
    } ).move( x, y );


    //var ChineseButton = draw.rect(150, 80).fill('white').stroke({width: 2}).move(x + 75, y + 135);
    //
    //
    //var JapaneseButton = draw.rect(150, 80).fill('white').stroke({width: 2}).move(x + 75, y + 245);
    //
    //var anyothercusineButton = draw.rect(150, 80).fill('white').stroke({width: 2}).move(x + 75, y + 355);
    //
    //
    // var dishtext = draw.text("Chinese cusine\n").move(x+100,y+275).on('click',Chinesecusine1);
    draw.circle( 100 ).fill( c2 ).stroke( {
      width: 2
    } ).move( x + 105, y + 235 );
    var startText = draw.text( "Search\n" ).font( {
      size: 20,
      family: "Knewave"
    } ).move( x + 125, y + 272 ).on( 'click', selectMune );

    function selectMune() {
      var value = document.querySelector( 'input' ).value;
      console.log( value )
      document.querySelector( 'input' ).style.display = 'none';
      if ( value == 'Chinese cusine' ) {
        Chinesecusine1()
      } else {
        Japanesecusine1()
      }
    }


    function Chinesecusine1() {

      var cusinemenu1 = draw.rect( 300, 500 ).radius( 10 ).fill( c1 ).stroke( {
        width: 2
      } ).move( x, y );


      var picturebutton = draw.image( 'delish-sticky-orange-chicken-1.jpg' ).size( 90, 100 ).move( x + 200, y + 80 );
      var addText = draw.text( "Chinese cusine menu\n" ).font( {
        size: 24,
        family: "Knewave"
      } ).move( x + 20, y + 40 );
      var button1 = draw.rect( 165, 40 ).radius( 10 ).fill( "white" ).stroke( {
        width: 2
      } ).move( x + 18, y + 110 );
      var line = draw.line( x + 10, y + 80, x + 285, y + 80 ).stroke( {
        width: 2
      } )
      var line1 = draw.line( x + 10, y + 190, x + 285, y + 190 ).stroke( {
        width: 2
      } )
      var line2 = draw.line( x + 10, y + 300, x + 285, y + 300 ).stroke( {
        width: 2
      } )
      //var pictureText = draw.text("picture\n").move(x+210,y+120);
      var cusineText = draw.text( "Orange Chicken\n" ).font( {
        size: 22
      } ).move( x + 20, y + 120 ).on( 'click', cookingstep );


      function cookingstep() {

        var cookingstepinterface = draw.rect( 300, 500 ).fill( c1 ).radius( 10 ).stroke( {
          width: 2
        } ).move( x, y );
        var addText = draw.text( "Cooking steps\n" ).font( {
          size: 24
        } ).move( x + 70, y + 40 );
        var line = draw.line( x + 10, y + 80, x + 285, y + 80 ).stroke( {
          width: 2
        } )
        var cookingsteprect = draw.rect( 270, 360 ).fill( 'white' ).stroke( {
          width: 2
        } ).move( x + 15, y + 110 );
        var line1 = draw.line( x + 15, y + 280, x + 285, y + 280 ).stroke( {
          width: 2
        } );
        var cookingsteptext = draw.text( "Place chicken pieces in a large bowl" ).font( {
          size: 12,
          family: "Knewave"
        } ).move( x + 10, y + 120 );
        var cusinesnutrienttext = draw.text( "Cusines' nutrient content\n" ).move( x + 100, y + 380 );


      }

    }




    //var japanesecusineText = draw.text("Japanese cusine\n").move(x+95,y+175).on('click', Japanesecusine1);



    function Japanesecusine1() {

      var cusinemenu2 = draw.rect( 300, 500 ).radius( 10 ).fill( c1 ).stroke( {
        width: 2
      } ).move( x, y );
      var picturebutton = draw.image( 'picwdbAiG.jpg' ).size( 80, 80 ).move( x + 200, y + 90 );
      var picturebutton = draw.image( 'picwdbAiG.jpg' ).size( 80, 80 ).move( x + 200, y + 200 );
      var addText = draw.text( "Japanese cusine menu\n" ).font( {
        size: 24
      } ).move( x + 20, y + 40 );
      var line = draw.line( x + 10, y + 80, x + 285, y + 80 ).stroke( {
        width: 2
      } )
      var line1 = draw.line( x + 10, y + 190, x + 285, y + 190 ).stroke( {
        width: 2
      } )
      var line2 = draw.line( x + 10, y + 300, x + 285, y + 300 ).stroke( {
        width: 2
      } )
      //var pictureText = draw.text("picture\n").move(x+210,y+120);
      var cusineText = draw.text( "cusine's name\n" ).move( x + 20, y + 120 ).on( 'click', cookingstep1 );

      function cookingstep1() {

        var cookingstepinterface = draw.rect( 300, 500 ).fill( c1 ).radius( 10 ).stroke( {
          width: 2
        } ).move( x, y );
        var addText = draw.text( "Cooking steps\n" ).font( {
          size: 24
        } ).move( x + 70, y + 40 );
        var line = draw.line( x + 10, y + 80, x + 285, y + 80 ).stroke( {
          width: 2
        } )
        var cookingsteprect = draw.rect( 270, 360 ).fill( 'white' ).stroke( {
          width: 2
        } ).move( x + 15, y + 110 );
        var line1 = draw.line( x + 15, y + 280, x + 285, y + 280 ).stroke( {
          width: 2
        } );
        var cookingsteptext = draw.text( "Cooking steps' content\n" ).move( x + 100, y + 220 );
        var cusinesnutrienttext = draw.text( "Cusines' nutrient content\n" ).move( x + 100, y + 380 );
        console.log( "cooking steps and cusines' nutrient have not load" )
        alert( "sorry, I haven't finished this, I will add subsequent steps later." )
      }
    }
  }
}
parameter( 190, 25, '#F0FFFF', '#FFF0F5' )
