You can write module like this:

```
function Foo() {
    return function({title, paragraphs}) {
        return {
            template: () => `
                <div class="foo">
                    <h1>${title}</h1>
                    ${paragraphs.map(para => `
                        <p>${para}</p>
                    `)}
                </div>
            `
        }
    }
}
```

But what if you want to keep template in separate file? Easy.

Keep template function in `template` field and template context in `context` field:

```
function template({title, paragraphs}) {
    return `
        <div class="foo">
            <h1>${title}</h1>
            ${paragraphs.map(para => `
                <p>${para}</p>
            `)}
        </div>
    `;
}

function Foo() {
    return function({title, paragraphs}) {
        return {
            template,

            context: {
                title,
                paragraphs
            }
        }
    }
}
```

Bonus: you can mock context and render module views in sandbox to test your markup. And you can easily set up [Makeup](http://github.com/2gis/makeup) for your project.

Look 'todo' demo for examples of separate templates.
