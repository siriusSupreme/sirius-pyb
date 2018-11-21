/**
 * Created by Administrator on 2017/2/22.
 */

/*aja-page-content*/
$( function () {
  if ( !$.fn.ace_ajax ) {
    return;
  }

  if ( window.Pace ) {
    window.paceOptions = {
      ajax: true,
      document: true,
      eventLag: false, // disabled
      elements: {
        selectors: [ ".page-content-area[data-ajax-content='true']" ]
      }
    }
  }

  var demo_ajax_options = {
    default_url: 'admin/index/welcome.html', //default hash
    loading_icon: 'fa fa-spin fa-spinner fa-2x orange',
    loading_text: '',
    loading_overlay: null,
    update_breadcrumbs: true,
    update_title: true,
    update_active: true,
    close_active: true,
    max_load_wait: 10, //单位：s
    close_mobile_menu: '#sidebar',
    close_dropdowns: true,

    'content_url': function ( hash ) {
      //***NOTE***
      //this is for Ace demo only, you should change it to return a valid URL
      //please refer to documentation for more info

      /*if( !hash.match(/^page\//) ) return false;
       var path = document.location.pathname;*/

      //for example in Ace HTML demo version we convert /ajax/index.html#page/gallery to > /ajax/content/gallery.html and load it
      /*if(path.match(/(\/ajax\/)(index\.html)?/))
       return path.replace(/(\/ajax\/)(index\.html)?/, '/ajax/content/'+hash.replace(/^page\//, '')+'.html') ;*/

      //for example in Ace PHP demo version we convert "ajax.php#page/dashboard" to "ajax.php?page=dashboard" and load it
      /*return path + "?" + hash.replace(/\//, "=");*/

      return hash;
    }
  };

  //for IE9 and below we exclude PACE loader (using conditional IE comments)
  //for other browsers we use the following extra ajax loader options
  if ( window.Pace ) {
    demo_ajax_options[ 'loading_overlay' ] = 'body'; //the opaque overlay is applied to 'body'
  }

  //1、ajaxloadstart
  //2、ajaxloaddone
  //3、ajaxloadpost
  //4、ajaxloadcomplete
  //5、ajaxloaderror
  //6、ajaxloadlong
  //7、ajaxscriptsloaded

  //initiate ajax loading on this element( which is .page-content-area[data-ajax-content=true] in Ace's demo)
  $( ".page-content-area[data-ajax-content='false']" ).ace_ajax( demo_ajax_options )
    .one( 'ajaxloaddone', function ( e ) {
      window.$pageContentArea = $( ".page-content-area[data-ajax-content='true']" );
    } );

  //if general error happens and ajax is working, let's stop loading icon & PACE
  $( window ).on( 'error.ace_ajax ajaxloaderror ajaxloadlong', function ( e ) {
    $( ".page-content-area[data-ajax-content='true']" ).each( function () {
      var $this = $( this );
      if ( $this.ace_ajax( 'working' ) ) {
        if ( window.Pace && Pace.running ) {
          Pace.stop();
        }
        $this.ace_ajax( 'stopLoading', true );
      }
    } );
    layer.open( {
      type: 0,
      icon: 5,
      content: '请求出错，错误类型：' + e.type
    } );
  } );
} );

//
$( function () {
  $( '#sidebar2' ).insertBefore( '.page-content' );

  $( '.navbar-toggle[data-target="#sidebar2"]' ).insertAfter( '#menu-toggler' );

  $( document ).on( 'settings.ace.two_menu', function ( e, event_name, event_val ) {
    if ( event_name == 'sidebar_fixed' ) {
      if ( $( '#sidebar' ).hasClass( 'sidebar-fixed' ) ) {
        $( '#sidebar2' ).addClass( 'sidebar-fixed' );
        $( '#navbar' ).addClass( 'h-navbar' );
      } else {
        $( '#sidebar2' ).removeClass( 'sidebar-fixed' )
        $( '#navbar' ).removeClass( 'h-navbar' );
      }
    }
  } ).triggerHandler( 'settings.ace.two_menu', [ 'sidebar_fixed', $( '#sidebar' ).hasClass( 'sidebar-fixed' ) ] );
} )
