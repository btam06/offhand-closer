# Offhand-Closer
This tool is intended to provide extended html functionality with no dependencies and no JS configuration.

All the options can be set up directly on your markup just by setting a few data attributes.  These attributes are preset, but if you really want you can configure them to be something else to prevent overlap with another package you may be using.

# Initialization
To initialize closer, all you have to do is call it on the root element you want to use it on.  This is intended so you can use it exclusively in a contained area if you don't want it to automatically bind events to your whole DOM.
```
closer('body');
```

This call also accepts a config object if you want to change the attributes to something else
```
closer('body', { 'data-invisible': 'data-hidden' });
```

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

```
[data-invisible="true"] {
    display: none;
}
```

# Examples
## Deleting
```
<div>
    <div id="message_1">
        <span data-delete="#message_1">Delete</span>
        <p>Message 1</p>
    </div>
</div>
```

## Hiding
```
<div>
    <div id="message_2">
        <span data-hide="#message_2">Hide</span>
        <p>Message 2</p>
    </div>
</div>
```

## Hiding, but storing in session storage
```
<div>
    <div id="message_3">
        <span data-remember="session" data-hide="#message_3">Hide</span>
        <p>Message 3</p>
    </div>
</div>
```

## Hiding, but storing in local storage
```
<div>
    <div id="message_4">
        <span data-remember="local" data-hide="#message_4">Hide</span>
        <p>Message 4</p>
    </div>
</div>
```
