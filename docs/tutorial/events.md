# Tutorial

## Part 2. Events handling.

Imagine you have module containing button. You pass onClick handler to button via props:

```
function AlertingApp(slot) {
    return function() {
        const button = slot.init(Button, {
            text: 'click me',
            onClick: function() { alert('clicked'); }
        });

        return {
            template: () => `${button}`
        };
    };
}
```


All you need to attach this handlers to DOM is to give node `data-onclick` attribute with wrapped handler as value.

```
function Button(slot) {
    return function({ text, onClick }) {
        const handleClick = slot.handler(onClick);

        return {
            template: () => `<button data-onclick="${handleClick}">${text}<button>`;
        };
    };
}
```


Let's do classic self-incrementing counter button. Click --> increment counter --> update view with `slot.rerender()`.

```
function IncrementingApp(slot) {
    const state = {
        counter: 0
    };

    return function() {
        // use same 'Button' module
        const button = slot.init(Button, {
            text: state.counter,
            onClick: function() {
                state.counter++;
                slot.rerender();
            }
        });

        return {
            template: () => `${button}`
        };
    };
}
```

Now you are ready to build your first SPA with slot-ui.
