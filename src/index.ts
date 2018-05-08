export const AnError = Symbol('AnErrorSymbol');

export type IError = {
    AnError?: Symbol;
}



/**
 * Checks an object to verify whether it represents a failure. Will return true if the checked object
 * contains the either_error_symbol property properly set to EitherErrorSymbol
 * 
 * The usage of this method on an (T | U) type in an if block will narrow the type allowing only
 * the actual available properties of the underyling object to be accessed
 * @param either An object that can represent either a failure of some success payload
 */
export function isError<T, U extends object>(either: T | U): either is U {
    const potentialError = <IError>either; 
    if (potentialError.AnError) {
        return potentialError.AnError === AnError;
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
    
    for (let x in failureObj) {
        error[x] = (failureObj as any)[x];
    }

    error.AnError = AnError;
    return error;
}