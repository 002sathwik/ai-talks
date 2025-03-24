import { createTRPCRouter, publicProcedure } from "../trpc";

export const aiRouter = createTRPCRouter({
    getAiTalks: publicProcedure.query(async ({ ctx }) => {

        const aiTalksCount = await ctx.db.talk.count({
            where: {
                ai: {

                    id: "bbb29de1-756f-4c42-8dc4-be0801dfbbab",

                },
            },
        });

        return aiTalksCount;
    }),
});
