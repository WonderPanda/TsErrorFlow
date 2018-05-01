import { isError, makeError, IError, AnErrorSymbol } from './index';

interface SuccessData {
    message: string;   
}

describe('CoreFunctions', () => {    
    it('should be able to convert any object into one which represents an error', () => {
        const successLike: SuccessData = {
            message: 'this looks like success'
        };

        const successLikeError = makeError(successLike);

        const result = isError(successLikeError);
        expect(result).toBe(true);
    });

    it('should not generate false positives for symbols (aka symbols do what they say they do)', () => {
        const errorLike = {
            someData: 42,
            AnErrorSymbol: Symbol('AnErrorSymbol')
        };

        const result = isError<SuccessData, {}>(errorLike);
        expect(result).toBe(false); 
    });
});