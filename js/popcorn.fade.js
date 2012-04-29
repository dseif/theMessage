(function ( Popcorn ) {
  function fade( from, to, rate ) {
    from.style.opacity = 1;
    to.style.opacity = 0;
      var fromOpacity = +from.style.opacity,
       toOpacity = +to.style.opacity,
       interval = setInterval(function() {
          if ( fromOpacity > 0 ) {
            fromOpacity -= rate;
            toOpacity += rate;
            from.style.opacity = "" + fromOpacity;
            to.style.opacity = "" + toOpacity;
          } else {
            clearInterval( interval );
          }
        }, 50);
  }
  Popcorn.plugin( "fade" , {
    manifest: {
    },
    _setup: function( options ) {
      function createImg( src, display ) {
        var img = document.createElement( "img" );

        img.src = options[ src ];
        img.style.zIndex = ++initialZindex;
        img.style.position = "absolute";
        img.style.top = 0 + "px";
        display ? img.style.opacity = 100 : img.style.opacity = 0;
        options[ src ] = img;
        options.container.appendChild( img );
      }

      console.log('SETUP');

      options.container = document.getElementById( options.target );
      var initialZindex = options.container.style.zIndex || 0;

      createImg( "img1", true );
      createImg( "img2");
      var rect = options.img1.getBoundingClientRect();

    },
    start: function( event, options ){
      fade( options.img1, options.img2, options.rate );
    },
    end: function( event, options ){
      fade( options.img2, options.img1, options.rate );
    },
    _teardown: function( options ) {
    }
  });
})( Popcorn );
