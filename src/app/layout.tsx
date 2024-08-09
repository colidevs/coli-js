"use client";

import Link from "next/link";
import {useContext} from "react";

import {DifficultyContext, DifficultyProvider} from "@/difficultyContext";
import "./globals.css";

function LayoutContent({children}: {children: React.ReactNode}) {
  const {setSelectedCategory} = useContext(DifficultyContext);

  return (
    <html className="h-full" lang="en">
      <body className="grid min-h-screen grid-rows-[auto,1fr,auto] bg-background bg-slate-950 px-4 font-sans antialiased">
        <div>
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <header className="text-xl font-bold leading-[4rem]">
            <Link href="/">coli-js</Link>
            <nav className="flex justify-center space-x-8 text-center">
              <Link href="/">
                <button
                  className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-150"
                  type="button"
                  onClick={() => setSelectedCategory("facil")}
                >
                  <p className="px-5 py-2 text-base">Facil</p>
                </button>
              </Link>
              <Link href="/">
                <button
                  className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-150"
                  type="button"
                  onClick={() => setSelectedCategory("medio")}
                >
                  <p className="px-5 py-2 text-base">Medio</p>
                </button>
              </Link>
              <Link href="/">
                <button
                  className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-150"
                  type="button"
                  onClick={() => setSelectedCategory("dificil")}
                >
                  <p className="px-5 py-2 text-base">Dificil</p>
                </button>
              </Link>
              <Link href="/">
                <button
                  className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-150"
                  type="button"
                  onClick={() => setSelectedCategory("imposible")}
                >
                  <p className="px-5 py-2 text-base">Imposible</p>
                </button>
              </Link>
            </nav>
          </header>
          <main className="py-8">{children}</main>
          <footer className="text-center leading-[4rem] opacity-70">
            © {new Date().getFullYear()} coli-js
          </footer>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <DifficultyProvider>
      <LayoutContent>{children}</LayoutContent>
    </DifficultyProvider>
  );
}
