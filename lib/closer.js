export default function(root, options) {
    if (options === undefined) {
        var options = {};
    }

    /**
     * Default attribute definitions
     * These can be changed if desired to prevent conflict with other plugins
     *
     * hideAttribute      - Select element to hide
     * deleteAttribute    - Select element to delete
     * invisibleAttribute - Attribute to set to determine invisibility if true
     * rememberAttribute  - If defined, set type of storage to use
     *                      Valid values:
     *                      * session - use JS sessionStorage
     *                      * local   - use JS localStorage
     * @type {Object}
     */
    var defaults = {
        "hideAttribute": "data-hide",
        "deleteAttribute": "data-delete",
        "invisibleAttribute": "data-invisible",
        "rememberAttribute": "data-remember"
    };

    var defaultKeys = Object.keys(defaults);

    for (var o = 0; o < defaultKeys.length; o++) {
        if (!options[defaultKeys[o]]) {
            options[defaultKeys[o]] = defaults[defaultKeys[o]];
        }
    }

    var root      = document.querySelector(root);
    var operators = root.querySelectorAll('[' + options.hideAttribute +'], [' + options.deleteAttribute +']');

    /**
     *
     * @param  {[type]} element Element to check action
     * @return {[type]}         element
     */
    var determineAttribute = function(element) {
        var attribute = options.hideAttribute;

        if (element.getAttribute(options.hideAttribute)) {
            attribute = options.hideAttribute;

        } else if (element.getAttribute(options.deleteAttribute)) {
            attribute = options.deleteAttribute;

        }

        return attribute;
    };

    /**
     * Hash a string
     * @param  {string} s String to hash
     * @return {string}   Hashed String
     */
    var hash = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }

    /**
     * Determine if an element is closed
     * @param  {element} operator [description]
     * @return {boolean}          [description]
     */
    var getClosed = function(operator) {
        var attribute = determineAttribute(operator);
        var selector  = operator.getAttribute(attribute);
        var remember  = operator.getAttribute(options.rememberAttribute);

        if (remember && remember.length) {
            switch (remember) {
                case 'session':
                    return (sessionStorage.getItem(hash(window.location.hostname + selector)) == 1)

                case 'local':
                    return (localStorage.getItem(hash(window.location.hostname + selector)) == 1)
            }
        }

        return false;
    }


    var close = function(operator) {
        var attribute = determineAttribute(operator);
        var selector  = operator.getAttribute(attribute);
        var target    = root.querySelector(selector);
        var remember  = operator.getAttribute(options.rememberAttribute);

        if (remember && remember.length) {
            switch (remember) {
                case 'session':
                    sessionStorage.setItem(hash(window.location.hostname + selector), 1);
                    break;

                case 'local':
                    localStorage.setItem(hash(window.location.hostname + selector), 1);
                    break;
            }
        }

        switch(attribute) {
            case options.hideAttribute:
                if (target.getAttribute(options.invisibleAttribute) != 'true') {
                    target.setAttribute(options.invisibleAttribute, 'true');
                }
                break;

            case options.deleteAttribute:
                target.parentElement.removeChild(target);
                break;
        }
    }

    for (var c = 0; c < operators.length; c++) {

        var operator    = operators[c];
        var attribute   = determineAttribute(operator);
        var selector    = operator.getAttribute(attribute);
        var target      = root.querySelector(selector);

        if (getClosed(operator) == true) {
            close(operator);

        } else {
            target.setAttribute(options.invisibleAttribute, false);
            operator.addEventListener('click', function() {
                close(this);
            });
        }
    }
}
