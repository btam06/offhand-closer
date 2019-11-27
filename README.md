# Offhand-Closer
This tool is intended to provide extended html functionality with no dependencies and no JS configuration.

All the options can be set up directly on your markup just by setting a few data attributes.  These attributes are preset, but if you really want you can configure them to be something else to prevent overlap with another package you may be using.

# Attributes
Attribute           | Description
--------------------| -------------------
data-hide           | Select an element to hide (Accepts any css selector)
data-delete         | Select an element to delete (Accepts any css selector)
data-invisible      | Attribute to set for invisibility
data-remember       | <ul><li>`session` to remember using JS sessionStore</li><li>`local` to remember using JS localStorage</li></ul>

# Hiding vs Deleting
Hiding sets the data-invisible attribute to true, deleting removes the element from the DOM.

## data-invisible doesn't actually do anything?
No, it doesn't.  You have to set what it actually does in your CSS.  This is intended to allow more flexibility than strictly setting display: none or any other style attributes directly.  Also this package is intended just to manipulate the DOM, how you style that is up to you.
