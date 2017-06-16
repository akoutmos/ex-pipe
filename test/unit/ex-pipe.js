import { ExecPipe, GenPipe } from '../../src/ex-pipe'

describe('Ex-Pipe', () => {
    describe('When running ExecPipe', () => {
        it('should return the input when second parameter is omitted', () => {
            let initialInput = 5

            expect(ExecPipe(5)).to.equal(initialInput)
        })

        it('should pass initial value to function when stage is a function', () => {
            let MultiplyTwo = (val) => val * 2

            let initialInput = 5
            let result = ExecPipe(initialInput, MultiplyTwo)

            expect(result).to.equal(MultiplyTwo(initialInput))
        })

        it('should compose functions when multiple functions are provided', () => {
            let MultiplyTwo = (val) => val * 2
            let AddTen = (val) => val + 10

            let initialInput = 5
            let result = ExecPipe(initialInput,
                MultiplyTwo,
                AddTen
            )

            expect(result).to.equal(AddTen(MultiplyTwo(initialInput)))
        })

        it('should compose functions when stages are provided as arrays', () => {
            let Caps = (val) => val.toUpperCase
            let AddPrefix = (val, prefix) => `${prefix} - val`
            let AddPostfix = (val, delim, postfix) => `${val}${delim}${postfix}`

            let initialInput = 'hello world'
            let result = ExecPipe(initialInput,
                [Caps],
                [AddPrefix, 'PRE'],
                [AddPostfix, ' |> ', 'POST']
            )

            expect(result).equal(AddPostfix(AddPrefix(Caps(initialInput), 'PRE'), ' |> ', 'POST'))
        })
    })

    describe('When running GenPipe', () => {
        it('should return function that can be executed for a result', () => {
            let MultiplyTwo = (val) => val * 2
            let AddArbitrary = (val, add) => val + add

            let initialInput = 5
            let resultFunc = GenPipe(
                MultiplyTwo,
                [AddArbitrary, 10]
            )

            expect(resultFunc).to.be.a('function')
            expect(resultFunc(initialInput)).to.equal(AddArbitrary(MultiplyTwo(initialInput), 10))
        })
    })
})
