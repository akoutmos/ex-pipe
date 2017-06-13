/*
 * Pipe is a simple utility that attempts to mimic the
 * pipe '|>' functionality found in Elixir, but in JS
 */

module.exports = (initialInput, ...nextFunctions) => {
    let input = initialInput
    let output = initialInput

    while (nextFunctions.length) {
        let nextPipe = nextFunctions.shift()

        // Deal with the next element in the pipeline
        if (typeof nextPipe === 'function') {
            output = nextPipe(input)
        } else if (Array.isArray(nextPipe)) {
            let [func, ...args] = nextPipe
            output = func(input, ...args)
        }

        input = output
    }

    return output
}
