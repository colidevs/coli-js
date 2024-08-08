"use client";

import Link from "next/link";
import {useContext} from "react";

import {DifficultyContext, DifficultyProvider} from "@/difficultyContext";
import "./globals.css";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function LayoutContent({children}: {children: React.ReactNode}) {
  const {selectedCategory, setSelectedCategory} = useContext(DifficultyContext);

  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <header className="text-xl font-bold leading-[4rem]">
          <Link href="/">coli-js</Link>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/171585901?s=200&v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <nav className="flex-1 space-x-8 text-center">
            <Link href="/">
              <button
                className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-200"
                type="button"
                onClick={() => setSelectedCategory("facil")}
              >
                <p className="px-5 py-2 text-base">Categoria 1</p>
              </button>
            </Link>
            <Link href="/">
              <button
                className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-200"
                type="button"
                onClick={() => setSelectedCategory("medio")}
              >
                <p className="px-5 py-2 text-base">Categoria 2</p>
              </button>
            </Link>
            <Link href="/">
              <button
                className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-200"
                type="button"
                onClick={() => setSelectedCategory("dificil")}
              >
                <p className="px-5 py-2 text-base">Categoria 3</p>
              </button>
            </Link>
            <Link href="/">
              <button
                className="rounded-lg bg-white text-black shadow-md shadow-white duration-300 hover:mx-2 hover:scale-110 hover:delay-200"
                type="button"
                onClick={() => setSelectedCategory("imposible")}
              >
                <p className="px-5 py-2 text-base">Categoria 4</p>
              </button>
            </Link>
          </nav>
        </header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} coli-js
        </footer>
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
