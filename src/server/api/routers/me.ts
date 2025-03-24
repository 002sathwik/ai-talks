import { createTRPCRouter, publicProcedure } from "../trpc";

export const meRouter = createTRPCRouter({

    getMeTalks: publicProcedure.query(async ({ ctx }) => {
     
        const aiTalksCount = await ctx.db.talk.count({
            where: {
                me: {

                    id: "fcd51f51-2de2-4a9a-a578-d7e6997d2130",

                },
            },
        });

        return aiTalksCount;
    }),
});