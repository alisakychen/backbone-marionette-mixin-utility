var _utils = {},
    /* http://open.bekk.no/mixins-in-backbone
     * Kim Joar Bekkelund */
    extendMethod = function(to, from, methodName) {
        if (!_.isUndefined(from[methodName])) {
            if (!_.isUndefined(to[methodName])) {

                // create a new function on to
                // wherein we first call the method which exists on `to`
                // then call the method on `from`,
                // returning what the method on 'to' returns
                var toOrig = to[methodName];
                to[methodName] = function() {
                    var returnVal;
                    from[methodName].apply(this, arguments);
                    returnVal = toOrig.apply(this, arguments);
                    return returnVal;
                };
            } else {
                to[methodName] = function() {
                    return from[methodName].apply(this, arguments);
                };
            }
        }
    };

/* http://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/ 
 * Derick Bailey */

// build a mixin function to take a target that receives the mixin, 
// a source that is the mixin, and a list of methods to
// copy over to the target

// NOTE: only functions listed by methodNames are mixed together; all others will be shadowed
 
_utils.mixinToView = function (target, source, methodNames) {

    // ignore the actual args list and build from arguments so we can
    // be sure to get all of the method names
    var deepDefault = [],
        args = Array.prototype.slice.apply(arguments);

    target = args.shift();
    source = args.shift();
    methodNames = args;

    // add methods and events which exist on 'source' but not 'target' over to 'target'

    //special cases to deepDefault
    deepDefault = ['attributes', 'regions', 'events', 'modelEvents', 'collectionEvents' ];
    _.each(deepDefault, function (property) {
        if (typeof target[property] !== 'undefined' || typeof source[property] !== 'undefined') {
            _.defaults(target[property], source[property]);
        }
    });

    var targetClassName = (typeof target.className !== 'undefined') ? target.className : '';
    var sourceClassName = (typeof source.className !== 'undefined') ? (source.className + ' ') : '';
    target.className = sourceClassName + targetClassName;

    _.each(methodNames, function (methodName) {
        extendMethod(target, source, methodName);
    });

    _.defaults(target, source);

    return target;
};