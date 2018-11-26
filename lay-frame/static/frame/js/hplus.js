function NavToggle() {
  $( ".navbar-minimalize" ).trigger( "click" )
}

function SmoothlyMenu() {
  if ( $( "body" ).hasClass( "mini-navbar" ) ) {
    if ( $( "body" ).hasClass( "fixed-sidebar" ) ) {
      $( "#side-menu" ).hide()

      setTimeout( function () {
        $( "#side-menu" ).fadeIn( 500 )
      }, 300 )
    } else {
      $( "#side-menu" ).removeAttr( "style" )
    }
  } else {
    $( "#side-menu" ).hide()

    setTimeout( function () {
      $( "#side-menu" ).fadeIn( 500 )
    }, 100 )
  }
}

function localStorageSupport() {
  return "localStorage" in window && null !== window.localStorage
}

layer.config( {
  extend: [ "extend/layer.ext.js", "skin/moon/style.css" ],
  skin: "layer-ext-moon"
} )

$( document ).ready( function () {
  function e() {
    var e = $( "body > #wrapper" ).height() - 61

    $( ".sidebard-panel" ).css( "min-height", e + "px" )
  }

  // 初始化左侧菜单
  $( "#side-menu" ).metisMenu()

  // 绑定右侧栏点击展开、收起事件
  $( ".right-sidebar-toggle" ).click( function () {
    $( "#right-sidebar" ).toggleClass( "sidebar-open" )
  } )

  // 初始化右侧栏滚动条
  $( ".sidebar-container" ).slimScroll( {
    height: "100%",
    railOpacity: .4,
    wheelStep: 10
  } )

  // 绑定聊天窗口弹出、隐藏事件
  $( ".open-small-chat" ).click( function () {
    $( this ).children().toggleClass( "fa-comments" ).toggleClass( "fa-remove" )

    $( ".small-chat-box" ).toggleClass( "active" )
  } )

  // 初始化聊天窗口滚动条
  $( ".small-chat-box .content" ).slimScroll( {
    height: "234px",
    railOpacity: .4
  } )

  $( ".check-link" ).click( function () {
    var e = $( this ).find( "i" )
    var a = $( this ).next( "span" )

    e.toggleClass( "fa-check-square" ).toggleClass( "fa-square-o" )
    a.toggleClass( "todo-completed" )

    return false
  } )

  // 初始化左侧菜单滚动条
  $( function () {
    $( ".sidebar-collapse" ).slimScroll( {
      height: "100%",
      railOpacity: .9,
      alwaysVisible: !1
    } )
  } )

  // 绑定左侧菜单点击展开、收起事件
  $( ".navbar-minimalize" ).click( function () {
    $( "body" ).toggleClass( "mini-navbar" )

    SmoothlyMenu()
  } )

  e()

  // 绑定窗口加载、调整大小、点击、滚动事件
  $( window ).bind( "load resize click scroll", function () {
    $( "body" ).hasClass( "body-small" ) || e()
  } )

  // 绑定窗口滚动事件
  $( window ).scroll( function () {
    $( window ).scrollTop() > 0 && !$( "body" ).hasClass( "fixed-nav" ) ? $( "#right-sidebar" ).addClass( "sidebar-top" ) : $( "#right-sidebar" ).removeClass( "sidebar-top" )
  } )

  // 初始化所有需要美化的滚动条
  $( ".full-height-scroll" ).slimScroll( {
    height: "100%"
  } )

  // 如果左侧菜单是折叠状态，则点击时展开
  $( "#side-menu>li" ).click( function () {
    $( "body" ).hasClass( "mini-navbar" ) && NavToggle()
  } )

  // 在小屏幕展示下，点击菜单项后立即隐藏
  $( "#side-menu>li li a" ).click( function () {
    $( window ).width() < 769 && NavToggle()
  } )

  // 给所有需要操作左侧菜单展示、隐藏的元素绑定事件
  $( ".nav-close" ).click( NavToggle )

  if ( /(iPhone|iPad|iPod|iOS)/i.test( navigator.userAgent ) ) $( "#content-main" ).css( "overflow-y", "auto" )
} )

// 窗口加载、调整大小时，重新规划元素的布局展示
$( window ).bind( "load resize", function () {
  $( this ).width() < 769 && ( $( "body" ).addClass( "mini-navbar" ), $( ".navbar-static-side" ).fadeIn() )
} )

$( function () {
  $( "#fixednavbar" ).click( function () {
    if ( $( "#fixednavbar" ).is( ":checked" ) ) {
      $( ".navbar-static-top" ).removeClass( "navbar-static-top" ).addClass( "navbar-fixed-top" )
      $( "body" ).removeClass( "boxed-layout" ).addClass( "fixed-nav" )
      $( "#boxedlayout" ).prop( "checked", false )
      localStorageSupport && localStorage.setItem( "boxedlayout", "off" )
      localStorageSupport && localStorage.setItem( "fixednavbar", "on" )
    } else {
      $( ".navbar-fixed-top" ).removeClass( "navbar-fixed-top" ).addClass( "navbar-static-top" )
      $( "body" ).removeClass( "fixed-nav" )
      localStorageSupport && localStorage.setItem( "fixednavbar", "off" )
    }
  } )

  $( "#collapsemenu" ).click( function () {
    if ( $( "#collapsemenu" ).is( ":checked" ) ) {
      $( "body" ).addClass( "mini-navbar" )
      SmoothlyMenu()
      localStorageSupport && localStorage.setItem( "collapse_menu", "on" )
    } else {
      $( "body" ).removeClass( "mini-navbar" )
      SmoothlyMenu()
      localStorageSupport && localStorage.setItem( "collapse_menu", "off" )
    }
  } )

  $( "#boxedlayout" ).click( function () {
    if ( $( "#boxedlayout" ).is( ":checked" ) ) {
      $( "body" ).addClass( "boxed-layout" )
      $( "#fixednavbar" ).prop( "checked", false )
      $( ".navbar-fixed-top" ).removeClass( "navbar-fixed-top" ).addClass( "navbar-static-top" )
      $( "body" ).removeClass( "fixed-nav" )
      localStorageSupport && localStorage.setItem( "fixednavbar", "off" )
      localStorageSupport && localStorage.setItem( "boxedlayout", "on" )
    } else {
      $( "body" ).removeClass( "boxed-layout" )
      localStorageSupport && localStorage.setItem( "boxedlayout", "off" )
    }
  } )

  $( ".s-skin-0" ).click( function () {
    $( "body" ).removeClass( "skin-1" )
    $( "body" ).removeClass( "skin-2" )
    $( "body" ).removeClass( "skin-3" )

    return false
  } )

  $( ".s-skin-1" ).click( function () {
    $( "body" ).removeClass( "skin-2" )
    $( "body" ).removeClass( "skin-3" )
    $( "body" ).addClass( "skin-1" )

    return false
  } )

  $( ".s-skin-3" ).click( function () {
    $( "body" ).removeClass( "skin-1" )
    $( "body" ).removeClass( "skin-2" )
    $( "body" ).addClass( "skin-3" )

    return false
  } )

  if ( localStorageSupport ) {
    var e = localStorage.getItem( "collapse_menu" )
    var a = localStorage.getItem( "fixednavbar" )
    var o = localStorage.getItem( "boxedlayout" )

    "on" == e && $( "#collapsemenu" ).prop( "checked", "checked" )
    "on" == a && $( "#fixednavbar" ).prop( "checked", "checked" )
    "on" == o && $( "#boxedlayout" ).prop( "checked", "checked" )
  }
  if ( localStorageSupport ) {
    var e = localStorage.getItem( "collapse_menu" )
    var a = localStorage.getItem( "fixednavbar" )
    var o = localStorage.getItem( "boxedlayout" )
    var l = $( "body" )

    "on" == e && ( l.hasClass( "body-small" ) || l.addClass( "mini-navbar" ) )
    "on" == a && ( $( ".navbar-static-top" ).removeClass( "navbar-static-top" ).addClass( "navbar-fixed-top" ), l.addClass( "fixed-nav" ) )
    "on" == o && l.addClass( "boxed-layout" )
  }
} )
