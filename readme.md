# TsErrorFlow
A one file, zero-dependency library for improved control flow and error handling in TypeScript. In fact, the entire code base is only 43 lines including comments. Inspired by the concepts of [Railway Oriented Programming](https://fsharpforfunandprofit.com/rop/).

TsErrorFlow leverages [Union Types, Intersection Types, User-Defined Type Guards](http://www.typescriptlang.org/docs/handbook/advanced-types.html) to provide an intuitive and type safe developer experience for error handling.


# Usage
TsErrorFlow allows you to represent the potential errors in your application domain using plain old javascript objects. This makes it easier to follow a more explicit coding style in which relevant information about things that went wrong can be passed simply and acted on, instead of relying on throwing Errors for control flow:

```typescript
interface ParkingLotFullError = {
    tryAgainAt: Date;
}

interface Ticket {
    ticketNumber: string;
    issuedAt: Date;
}

function tryGetTicket(): Ticket | ParkingLotFullError {
    if (lotIsFull()) {
        return makeError({
            tryAgainAt: new Date()
        });
    } 

    // return an actual ticket
}

const ticketResponse = tryGetTicket();

if (isError<Ticket, ParkingLotFullError>(ticketResponse)) {
    // response is definitely an error and will only allow access of properties from ParkingLotFullError
} else {
    // response is definitely a ticket and will only allow access of properties from Ticket
}
```