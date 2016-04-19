# Tutorial

## Part 1. Module, template, render. Module tree.

So, we need a module which prints 'Hello, world!'. Easy!

```
const Hello = function() {
    return function() {
        return {
            template: () => `Hello, world!`
        };
    };
};

import { ModuleInstance } from 'slot-ui';
(new ModuleInstance(Hello)).toString(); // 'Hello, world!'
```


Ok. And if we want to pass params to print 'Hello, %name%'?

```
const Hello = function() {
    return function(name) {
        return {
            template: () => `Hello, ${name}!`
        };
    };
};

import { ModuleInstance } from 'slot-ui';
(new ModuleInstance(Hello, 'React')).toString(); // 'Hello, React!'
```


Ok. But our story is about building big complex applications, we need multiple modules.

```
const Name = function() {
    return function(name) {
        return {
            template: () => `<span>${name}</span>`
        };
    };
};

const Hello = function(slot) {
    return function(names) {
        const namesModules = names.map(item => {
            slot.init(Name, item);
        })
        return {
            template: () => `Hello, ${namesModules.join()}!`
        };
    };
};

// we have to seed slot to build a module tree
import { Slot } from 'slot-ui';
const slot = new Slot();

import { ModuleInstance } from 'slot-ui';
(new ModuleInstance(Hello, ['Foo', 'Bar', 'Baz'], slot)).toString(); // 'Hello, Foo, Bar, Baz!'
```


So, it's cool, but we want to attach our module tree to DOM to see it and touch it.

```
const Name = function() {
    ...
};

const Hello = function(slot) {
    ...
};

// Do not use ModuleInstance and Slot constructors by yourself!
// You need the only one entry point:
import { Root } from 'slot-ui';

const root = new Root(Hello, ['Foo', 'Bar', 'Baz']);

root.mount(
    document.querySelector('#some-selector-for-your-app-container')
);
```


That's all about generating HTML.


And we need event bindings. [Second part of this tutorial](events.md)

---

Relevant tips: 

- [templates-and-context](../tips/templates-and-context.md)

