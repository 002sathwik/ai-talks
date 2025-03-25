


import Head from "next/head";
import { LampContainer } from "~/components/lamp";
import { motion } from "framer-motion";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();


  return (
    <>
      <Head>
        <title>AI Talks</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">

        {/* AI & Me Data Count */}

        {/* Lamp Effect */}
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            AI-Talks💯✨ <br />
          </motion.h1>
        </LampContainer>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-4 gap-10 ">
          <motion.button
            onClick={() => router.push("/add")}
            className="bg-blue-500 px-6 py-3  mr-4 rounded-full text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ➕ Add
          </motion.button>

          <motion.button
            onClick={() => router.push("/get")}
            className="bg-green-500 px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🎲 Pick
          </motion.button>

          <footer className="w-full mt-10 py-4 text-center text-white">
            <p>
              Made with ❤️ By
              <a
                href="https://github.com/002sathwik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline ml-1"
              >
                Engineer
              </a>
            </p>
          </footer>

        </div>

      </main>


    </>
  );
}

