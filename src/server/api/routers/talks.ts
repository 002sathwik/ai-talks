import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const talkRouter = createTRPCRouter({
    addTalk: publicProcedure
        .input(
            z.object({
                name: z.string(),
                aiId: z.string().optional(),
                meId: z.string().optional(),
            })
                .refine((data) => data.aiId ?? data.meId, {
                    message: "Either aiId or meId must be provided.",
                })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, aiId, meId } = input;

            if (aiId) {
                const aiExists = await ctx.db.aI.findUnique({ where: { id: aiId } });
                if (!aiExists) throw new Error("AI does not exist!");
            }

            if (meId) {
                const meExists = await ctx.db.me.findUnique({ where: { id: meId } });
                if (!meExists) throw new Error("Me does not exist!");
            }

            const talk = await ctx.db.talk.create({
                data: {
                    name,
                    ai: aiId ? { connect: { id: aiId } } : undefined,
                    me: meId ? { connect: { id: meId } } : undefined,
                },
            });

            return talk;
        }),


    getRandomTalk: publicProcedure.query(async ({ ctx }) => {
        const count = await ctx.db.talk.count({
            where: { state: "NOT_COMPLETED" },
        });

        if (count === 0) {
            throw new Error("No pending talks available!");
        }

        const randomTalk = await ctx.db.talk.findFirst({
            where: { state: "NOT_COMPLETED" },
            skip: Math.floor(Math.random() * count),
        });

        return randomTalk;
    }),

    updateTalkState: publicProcedure
        .input(
            z.object({
                talkId: z.string(),

                state: z.enum(["NOT_SURE", "NOT_COMPLETED", "COMPLETED"]),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { talkId, state } = input;
            const updatedTalk = await ctx.db.talk.update({
                where: { id: talkId },
                data: {
                    state: state ?? "NOT_COMPLETED",
                },
            });
            return updatedTalk;
        }),

        
    getTalksByState: publicProcedure
        .input(
            z.object({
                state: z.enum(["NOT_SURE", "NOT_COMPLETED", "COMPLETED"]),
            })
        )
        .query(async ({ ctx, input }) => {
            const talks = await ctx.db.talk.findMany({
                where: { state: input.state },
                orderBy: { createdAt: "desc" },
            });
            return talks;
        }),
});

