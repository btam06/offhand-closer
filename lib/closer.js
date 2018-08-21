export default function(root, options = {}) {
    var defaults = {
        "hideAttribute": "data-hide",
        "deleteAttribute": "data-delete",
        "invisibleAttribute": "data-invisible"
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

    var close = function(closer) {
        var attribute = determineAttribute(closer);
        var id        = closer.getAttribute(attribute);
        var target    = root.querySelector('#' + id);

        switch(attribute) {
            case options.hideAttribute:
                target.setAttribute(options.invisibleAttribute, 'true');
                break;

            case options.deleteAttribute:
                target.parentElement.removeChild(target);
                break;
        }
    }

    for (var c = 0; c < closers.length; c++) {

        var closer    = closers[c];

        closer.addEventListener('click', function() {
            close(this);
        });
    }
}
