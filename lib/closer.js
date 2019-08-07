export default function(root, options = {}) {
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

    var root    = document.querySelector(root);
    var closers = root.querySelectorAll('[' + options.hideAttribute +'], [' + options.deleteAttribute +']');

    var determineAttribute = function(element) {
        var attribute = options.hideAttribute;

        if (element.getAttribute(options.hideAttribute)) {
            attribute = options.hideAttribute;

        } else if (element.getAttribute(options.deleteAttribute)) {
            attribute = options.deleteAttribute;

        }

        return attribute;
    };

    var getClosed = function(closer) {
        var attribute = determineAttribute(closer);
        var id        = closer.getAttribute(attribute);

        return ((closer.getAttribute(options.rememberAttribute) == 'true') &&
        (sessionStorage.getItem(hash(window.location.hostname + id)) == 1));
    }

    var hash = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }

    var close = function(closer) {
        var attribute = determineAttribute(closer);
        var id        = closer.getAttribute(attribute);
        var target    = root.querySelector('#' + id);

        if (closer.getAttribute(options.rememberAttribute) == 'true') {
            sessionStorage.setItem(hash(window.location.hostname + id), '1');
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

    for (var c = 0; c < closers.length; c++) {

        var closer    = closers[c];
        var attribute = determineAttribute(closer);
        var id        = closer.getAttribute(attribute);
        var target    = root.querySelector('#' + id);

        if (getClosed(closer) == true) {
            close(closer);

        } else {
            target.setAttribute(options.invisibleAttribute, false);
            closer.addEventListener('click', function() {
                close(this);
            });
        }
    }
}
