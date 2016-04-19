# Module

Module constructor — is a function of `slot`, returning function of `props`, returning view:

```
function(slot) { 
    return function(props) { 
        return VIEW; 
    }
}
```

Invoked, it gives us a function, which can provide view (html) for specified set of data called `props`. For structure purposes (insertion submodules, generating event handlers) module uses top-level argument `slot`.

[Templates and context](tips/templates-and-context.md)


# Module instance

tip: `moduleInstance.render() == moduleInstance.toString()`

...
