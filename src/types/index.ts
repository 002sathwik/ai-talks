import { type TalkState } from "@prisma/client";

// Talk model type
export type Talk = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    state: TalkState;
    aiId?: string | null;
    meId?: string | null;
    ai?: AI | null;
    me?: Me | null;
}


export type AI = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    talks?: Talk[];
}


export type Me = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    talks?: Talk[];
}
