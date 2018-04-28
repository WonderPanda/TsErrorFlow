import { isError, makeError, IError } from './index';

interface SuccessData {
    message: string;   
}

interface IErrorLike {
    someData: number;
    either_error_symbol: string | symbol;
}

describe('Either', () => {    
    it('should be able to convert any object into one which represents an error', () => {
        const successLike: SuccessData = {
            message: 'this looks like success'
        };

        const successLikeError = makeError(successLike);

        const result = isError(successLikeError);
        expect(result).toBe(true);
    });

    describe('should rely on the proper error symbol to differentiate actual errors', () => {
        it('should not generate false positives for strings', () => {
            const errorLike: IErrorLike = {
                someData: 42,
                either_error_symbol: 'looks like error'
            };
    
            const result = isError<SuccessData, IErrorLike>(errorLike);
            expect(result).toBe(false); 
        });

        it('should not generate false positives for symbols', () => {
            const errorLike: IErrorLike = {
                someData: 42,
                either_error_symbol: Symbol('ErrorSymbol')
            };
    
            const result = isError<SuccessData, IErrorLike>(errorLike);
            expect(result).toBe(false); 
        });
    });
});