export {
    ExecPipe,
    GenPipe
}

/**
 *
 * Pipe is a simple utility that attempts to mimic the
 * pipe '|>' functionality found in Elixir, but in JS
 *
 */
function ExecPipe (initialInput, ...nextFunctions) {
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

/**
 *
 * This is used to create a reusable pipeline of
 * functions
 *
 */
function GenPipe (...functions) {
    return function (initialInput) {
        return ExecPipe(initialInput, ...functions)
    }
}
