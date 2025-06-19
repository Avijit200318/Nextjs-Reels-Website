import { Connection } from "mongoose";


declare global{
    var mongoose: {
        connection: Connection | NonNullable;
        promise: Promise<Connection> | null;
    }
}

export {};