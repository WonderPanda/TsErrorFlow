export const EitherErrorSymbol = Symbol('EitherError');

export interface IError {
    either_error_symbol: Symbol;
}

/**
 * Checks an object to verify whether it represents a failure. Will return true if the checked object
 * contains the either_error_symbol property properly set to EitherErrorSymbol
 * 
 * The usage of this method on an (T | U) type in an if block will narrow the type allowing only
 * the actual available properties of the underyling object to be accessed
 * @param either An object that can represent either a failure of some success payload
 */
export function isError<T, U extends {}>(either: T | U): either is U {
    const candidateFailure = either as any;
    if (candidateFailure.either_error_symbol) {
        return candidateFailure.either_error_symbol === EitherErrorSymbol;
    }

    return false;
}

/**
 * Augments a given object with the either error symbol. This guarantees that it when checked
 * with isFailure this object will return true and narrow the type for the TypeScript compiler.
 * 
 * By leaving this open to any object, much more expressive domain specific error payloads
 * can be used;
 * @param failureObj The object that will be augmented to be an error
 */
export function makeError<T extends object>(failureObj: T) : T & IError {
    const error = <T & IError>{};
    error.either_error_symbol = EitherErrorSymbol;

    for (let x in failureObj) {
        error[x] = (failureObj as any)[x];
    }

    return error;
}