(function ( Popcorn ) {
  function fade( from, to, rate ) {
    from.style.opacity = from.style.opacity || 1;
    to.style.opacity = to.style.opacity || 0;
      var fromOpacity = +from.style.opacity,
       toOpacity = +to.style.opacity,
       interval = setInterval(function() {
         console.log( from, from.style.opacity );
          if ( fromOpacity > 0 ) {
            fromOpacity -= rate;
            toOpacity += rate;
            from.style.opacity = fromOpacity;
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
      function createImg( src ) {
        var img = document.createElement( "img" );

        img.src = options[ src ];
        img.style.zIndex = ++initialZindex;
        img.style.position = "absolute";
        img.style.top = 0 + "px";
        options[ src ] = img;
        options.container.appendChild( img );
      }

      options.container = document.getElementById( options.target );
      var initialZindex = options.container.style.zIndex || 0;
      console.log( "after z index",initialZindex );

      createImg( "img1" );
      createImg( "img2" );
      var rect = options.img1.getBoundingClientRect();
      console.log( rect );
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
