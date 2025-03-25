"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Talk = {
    id: string;
    name: string;
    aiId: string | null;
    meId: string | null;
    state: "NOT_COMPLETED" | "COMPLETED" | "NOT_SURE";
};

const GetTalk = () => {
    const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
    const [loading, setLoading] = useState(false);

    const { data: talk, refetch } = api.talk.getRandomTalk.useQuery(undefined, {
        enabled: false,
    });

    const updateTalkState = api.talk.updateTalkState.useMutation({
        onSuccess: () => {
            toast.success("Talk state updated!");
            setSelectedTalk(null);
        },
        onError: () => {
            toast.error("Failed to update talk state!");
        }
    });

    const handlePickTalk = async () => {
        setLoading(true);
        try {
            const response = await refetch(); // Fetch a new talk
            if (response.data) {
                setSelectedTalk(response.data);
            } else {
                toast.error("No talks available!");
            }
        } catch (error) {
            toast.error("Error fetching talk.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateState = (state: Talk["state"]) => {
        if (!selectedTalk) return;
        updateTalkState.mutate({
            talkId: selectedTalk.id,
            state
        });
    };
    const router = useRouter();
    const handleClick = () => {
        router.push("https://wa.me/919902130645");
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white">
            <div className="absolute top-4 right-4">
                <motion.button
                    onClick={() => router.push("/add")}
                    className="bg-gradient-to-r from-blue-200 to-purple-600 hover:shadow-lg hover:scale-105 px-5 py-2 rounded-md text-white font-semibold shadow-lg hover:scale-105 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ➕ Add
                </motion.button>
            </div>

            {!selectedTalk && !loading && (

                <motion.button
                    onClick={handlePickTalk}
                    className="bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-all"
                    whileTap={{ scale: 0.9 }}
                >
                    🎲 Pick Talk
                </motion.button>


            )}

            {loading && (
                <motion.div
                    className="text-lg font-semibold text-gray-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    Picking a talk...
                </motion.div>
            )}


            {selectedTalk && (
                <motion.div
                    className="p-6 bg-gray-800 rounded-lg shadow-lg w-96 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-4xl font-bold text-blue-400">{selectedTalk?.name}</h2>
                    <p className="text-xl text-gray-400 mt-2">
                        {selectedTalk.aiId ? "AI" : "ME"}
                    </p>


                    <div className="flex justify-center gap-3 mt-5">
                        <motion.button
                            onClick={() => handleUpdateState("NOT_COMPLETED")}
                            className="px-4 py-2 bg-red-500 rounded-lg hover:scale-105 transition-all"
                            whileTap={{ scale: 0.9 }}
                        >
                            ❌ Not Completed
                        </motion.button>
                        <motion.button
                            onClick={() => handleUpdateState("COMPLETED")}
                            className="px-4 py-2 bg-green-500 rounded-lg hover:scale-105 transition-all"
                            whileTap={{ scale: 0.9 }}
                        >
                            ✅ Completed
                        </motion.button>
                        <motion.button
                            onClick={() => handleUpdateState("NOT_SURE")}
                            className="px-4 py-2 bg-yellow-500 rounded-lg hover:scale-105 transition-all"
                            whileTap={{ scale: 0.9 }}
                        >
                            🤔 Not Sure
                        </motion.button>
                    </div>
                </motion.div>
            )}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center">



                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                    className="  border border-purple-500 px-4 py-2 rounded-full text-sm font-medium shadow-md   bg-purple-500 text-white transition-all"
                    >                
                    Click This and Close Your Eyes for 10 seconds  💬
                </motion.button>
            </div>
        </div>
    );
};

export default GetTalk;
