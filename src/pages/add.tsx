

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Add = () => {
    const [name, setName] = useState("");
    const [selectedType, setSelectedType] = useState<"AI" | "ME" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const add = api.talk.addTalk.useMutation();

    const handleSubmit = async () => {
        if (!name || !selectedType) {
            toast.error("Enter a name and select AI or ME");
            return;
        }

        setIsSubmitting(true);
        try {
            await add.mutateAsync({
                name,
                aiId: selectedType === "AI" ? "bbb29de1-756f-4c42-8dc4-be0801dfbbab" : undefined,
                meId: selectedType === "ME" ? "fcd51f51-2de2-4a9a-a578-d7e6997d2130" : undefined,
            });

            setName("");
            setSelectedType(null);
            toast.success("Talk added successfully!");
            setShowPopup(true);
        } catch (error) {
            console.error("Error adding talk:", error);
            toast.error("Error adding talk!");
        } finally {
            setIsSubmitting(false);
        }
    };
    const { data: ai = [] } = api.ai.getAiTalks.useQuery();
    const { data: me = [] } = api.me.getMeTalks.useQuery();
    const router =useRouter();
    return (
        <div className="bg-slate-950 w-full h-screen flex flex-col items-center justify-center gap-6">
            <div className="absolute top-4 right-4">
                <motion.button
                    onClick={() => router.push("/get")}
                    className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold shadow-lg hover:scale-105 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    🎲 Pick
                </motion.button>
            </div>
            <motion.input
                type="text"
                placeholder="Enter talk name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 text-lg rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            />


            <div className="flex gap-4">
                <motion.button
                    onClick={() => setSelectedType("AI")}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${selectedType === "AI" ? "bg-blue-600 scale-110" : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    whileTap={{ scale: 0.9 }}
                >
                    AM  &quot;AI&quot;
                </motion.button>
                <motion.button
                    onClick={() => setSelectedType("ME")}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${selectedType === "ME" ? "bg-green-600 scale-110" : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    whileTap={{ scale: 0.9 }}
                >
                    &quot;ME &quot;
                </motion.button>
            </div>

            {/* Submit Button with Loader */}
            <motion.button
                onClick={handleSubmit}
                className={`mt-4 px-6 py-2 text-lg text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105"
                    }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        ➕ Add Talk
                    </>
                )}
            </motion.button>

            {/* Success Popup */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold">🎉 Talk Added Successfully!</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                            onClick={() => setShowPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </motion.div>
            )}
            <div className="fixed bottom-0 left-0 w-full bg-slate-900 py-3 text-white flex justify-between px-6 text-lg font-semibold shadow-md">
                <div>🚀 AI Talks: {ai}</div>
                <div>🧑‍💻 ME Talks: {me}</div>
            </div>

        </div>
    );
};

export default Add;



