let test = require('tap').test
let P = require('../src/index.cjs.js')

test('Ex-Pipe', (t) => {
    t.plan(4)

    t.test('should return the input when second parameter is omitted', (t) => {
        let initialInput = 5

        t.equal(initialInput, P(5))

        t.end()
    })

    t.test('should pass initial value to function when stage is a function', (t) => {
        let MultiplyTwo = (val) => val * 2

        let initialInput = 5
        let result = P(initialInput, MultiplyTwo)

        t.equal(MultiplyTwo(initialInput), result)

        t.end()
    })

    t.test('should compose functions when multiple functions are provided', (t) => {
        let MultiplyTwo = (val) => val * 2
        let AddTen = (val) => val + 10

        let initialInput = 5
        let result = P(initialInput,
            MultiplyTwo,
            AddTen
        )

        t.equal(
            AddTen(MultiplyTwo(initialInput)),
            result
        )

        t.end()
    })

    t.test('should compose functions when stages are provided as arrays', (t) => {
        let Caps = (val) => val.toUpperCase
        let AddPrefix = (val, prefix) => `${prefix} - val`
        let AddPostfix = (val, delim, postfix) => `${val}${delim}${postfix}`

        let initialInput = 'hello world'
        let result = P(initialInput,
            [Caps],
            [AddPrefix, 'PRE'],
            [AddPostfix, ' |> ', 'POST']
        )

        t.equal(
            AddPostfix(AddPrefix(Caps(initialInput), 'PRE'), ' |> ', 'POST'),
            result
        )

        t.end()
    })

    t.end()
})
