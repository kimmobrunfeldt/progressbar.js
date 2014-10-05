/* Copyright (C) 2014 Justin Windle, http://soulwire.co.uk */

var fit = (function() {

    'use strict';

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Constants

    ————————————————————————————————————————————————————————————————————————————————
    */

    var THROTTLE_DURATION = 50;
    var TRANSFORM_ORIGIN = 'TransformOrigin';
    var TRANSFORM = 'Transform';
    var VENDORS = 'moz ms o webkit'.split( ' ' );
    var CENTER = 'center';
    var BOTTOM = 'bottom';
    var RIGHT = 'right';
    var LEFT = 'left';
    var TOP = 'top';
    var PX = 'px';

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Globals

    ————————————————————————————————————————————————————————————————————————————————
    */

    var win = window || self;
    var doc = document;
    var getStyle = win.getComputedStyle;
    var watching = [];
    var vendor;
    var then;
    var wait;

    var defaults = {
        hAlign: CENTER,
        vAlign: CENTER,
        watch: false,
        cover: false,
        apply: true
    };

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Utilities

    ————————————————————————————————————————————————————————————————————————————————
    */

    // Uppercase proxy for regex

    function toUpperCase( value ) {

        return value.toUpperCase();
    }

    // Returns true if an object is a number and not NaN

    function isNumber( value ) {

        return typeof value === 'number' && !isNaN( value );
    }

    // Shortcut to get the current time

    function getTime() {

        return new Date().getTime();
    }

    // Simple array mapping method (for non-ES5 browsers)

    function map( list, func ) {

        var out = [];

        for ( var i = 0, n = list.length; i < n; i++ )

            out[ i ] = func( list[ i ] );

        return out;
    }

    // Soft object augmentation

    function extend( target, source ) {

        for ( var key in source )

            if ( !( key in target ) )

                target[ key ] = source[ key ];

        return target;
    }

    // Determine vendor and prefix property

    function prefix( prop ) {

        if ( !vendor ) {

            var name, style = getStyle( doc.body ), test = TRANSFORM;

            for ( var i = 0, n = VENDORS.length; i < n; i++ ) {

                vendor = VENDORS[i];
                name = vendor + test;

                if ( name in style ) break;

                vendor = vendor.replace( /^(\w)/, toUpperCase );
                name = vendor + test;

                if ( name in style ) break;
            }
        }

        return vendor + prop;
    }

    // Returns the current CSS transformation matrix as an array

    function getMatrix( el ) {

        var css = getStyle( el );
        var ctm = css[ prefix( TRANSFORM ) ].replace( /[a-z()]/gi, '' ).split( ',' );

        if ( ctm.length < 6 )

            return [ 1, 0, 0, 1, 0, 0 ];

        for ( var i = 0; i < 6; i++ )

            ctm[i] = parseFloat( ctm[i] );

        return ctm;
    }

    if(!Array.prototype.indexOf){
        Array.prototype.indexOf = function(thing){
            for(var i=0;i<this.length;++i){
                if(this[i] == thing){
                    return i;
                }
            }
            return -1;
        }
    }

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Transform methods

    ————————————————————————————————————————————————————————————————————————————————
    */

    function cssTransform( transform, element ) {

        var matrix = getMatrix( element );

        matrix[0] = transform.scale;
        matrix[3] = transform.scale;
        matrix[4] += transform.tx;
        matrix[5] += transform.ty;

        var fixed = map( matrix, function( n ) { return n.toFixed( 6 ); });

        element.style[ prefix( TRANSFORM_ORIGIN ) ] = '0 0';
        element.style[ prefix( TRANSFORM ) ] = 'matrix(' + fixed.join( ',' ) + ')';
    }

    function cssPosition( transform, element ) {

        var style = getStyle( element );
        var left = parseFloat( style.left ) || 0;
        var top = parseFloat( style.top ) || 0;

        if ( style.position === 'static' )

            element.style.position = 'relative';

        element.style.left = left + transform.tx + PX;
        element.style.top = top + transform.ty + PX;

        element.style.height = transform.height + PX;
        element.style.width = transform.width + PX;
    }

    function cssMargin( transform, element ) {

        var style = getStyle( element );
        var left = parseFloat( style.marginLeft ) || 0;
        var top = parseFloat( style.marginTop ) || 0;

        element.style.marginLeft = left + transform.tx + PX;
        element.style.marginTop = top + transform.ty + PX;

        element.style.height = transform.height + PX;
        element.style.width = transform.width + PX;
    }

    function rectangle( transform, target ) {

        target.height *= transform.scale;
        target.width *= transform.scale;
        target.x += transform.tx;
        target.y += transform.ty;
    }

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Given an element or object, defines a standard rectangle

    ————————————————————————————————————————————————————————————————————————————————
    */

    function toRectangle( target ) {

        if ( target.nodeType && target.nodeType == 1 ) {

            var bounds = target.getBoundingClientRect();

            target = {
                height: target.offsetHeight,
                width: target.offsetWidth,
                x: bounds.left,
                y: bounds.top
            };
        }

        if ( !isNumber( target.x ) && isNumber( target.left ) )

            target.x = target.left;

        if ( !isNumber( target.y ) && isNumber( target.top ) )

            target.x = target.top;

        return target;
    }

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Event Handlers

    ————————————————————————————————————————————————————————————————————————————————
    */

    function onWindowResize() {

        // Throttle

        var now = getTime();
        var delta = now - then;

        if ( delta <= THROTTLE_DURATION ) {

            clearInterval( wait );
            wait = setTimeout( onWindowResize, THROTTLE_DURATION - delta );

        } else {

            for ( var i = 0, n = watching.length; i < n; i++ )

                watching[ i ]();

            then = now;
        }
    }

    /*
    ————————————————————————————————————————————————————————————————————————————————

        Fit

    ————————————————————————————————————————————————————————————————————————————————
    */

    function fit( target, container, options, callback, transform ) {

        // Normalise inputs to standard rectangle definitions

        var rect = toRectangle( target );
        var area = toRectangle( container );

        // Compute position offset and scale

        var wa = rect.width;
        var ha = rect.height;

        var wb = area.width;
        var hb = area.height;

        var sx = wb / wa;
        var sy = hb / ha;

        var ra = wa / ha;
        var rb = wb / hb;

        var sH = options.cover ? sy : sx;
        var sV = options.cover ? sx : sy;

        var scale = ra >= rb ? sH : sV;
        var w = wa * scale;
        var h = ha * scale;

        var tx = options.hAlign == CENTER ? 0.5 * ( w - wb ) : options.hAlign == RIGHT ? w - wb : 0.0;
        var ty = options.vAlign == CENTER ? 0.5 * ( h - hb ) : options.vAlign == BOTTOM ? h - hb : 0.0;

        // Build / modify transform object

        transform = transform || {};

        transform.tx = ( area.x - tx ) - rect.x;
        transform.ty = ( area.y - ty ) - rect.y;

        transform.x = ( area.x - tx ) - rect.x * scale;
        transform.y = ( area.y - ty ) - rect.y * scale;

        transform.height = rect.height * scale;
        transform.width = rect.width * scale;

        transform.scale = scale;

        // Apply default transform

        if ( callback )

            callback( transform, target );

        else if ( options.apply ) {

            if (typeof(HTMLElement) != 'undefined' && target instanceof HTMLElement )

                callback = cssTransform;

            else

                callback = rectangle;

            callback( transform, target );
        }

        return transform;
    }

    function main( target, container, options, callback ) {

        // Parse arguments

        if ( !target || !container )

            throw 'You must supply a target and a container';

        if ( typeof options === 'function' ) {

            callback = options;
            options = {};
        }

        // Default options

        options = extend( options || {}, defaults );

        // Do it

        var transform = fit( target, container, options, callback );

        // Optionally handle window resizes automatically

        if ( options.watch ) {

            if ( !watching.length ){

                if(win.addEventListener){
                    win.addEventListener( 'resize', onWindowResize );
                }else{
                    win.attachEvent( 'onresize', onWindowResize );
                }

            }

            transform.trigger = function() {

                fit( target, container, options, callback, transform );
            };

            transform.on = function( suppress ) {

                var index = watching.indexOf( transform.trigger );

                if ( !~index )

                    watching.push( transform.trigger );

                if ( !suppress )

                    transform.trigger();
            };

            transform.off = function() {

                var index = watching.indexOf( transform.trigger );

                if ( !!~index )

                    watching.splice( index, 1 );
            };

            transform.on( true );
        }

        return transform;
    }

    /*
    ————————————————————————————————————————————————————————————————————————————————

        API

    ————————————————————————————————————————————————————————————————————————————————
    */

    return extend( main, {

        // Properties

        watching: watching,
        defaults: defaults,

        // Methods

        cssTransform: cssTransform,
        cssPosition: cssPosition,
        cssMargin: cssMargin,

        // Constants

        CENTER: CENTER,
        BOTTOM: BOTTOM,
        RIGHT: RIGHT,
        LEFT: LEFT,
        TOP: TOP

    });

})();
