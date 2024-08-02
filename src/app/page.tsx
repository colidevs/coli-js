"use client";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import mock from "@/mocks/default.json";

interface EjercicioJs {
  id: number;
  ejercicio: string;
  opciones: string[];
  nivel: number;
}

export default function HomePage() {
  const ejercicios: EjercicioJs[] = mock as EjercicioJs[];

  function getRandom(): EjercicioJs {
    const numEjercicio = Math.floor(Math.random() * ejercicios.length) + 1;
    const ejercicioEncontrado = ejercicios.find((ejercicio) => ejercicio.id === numEjercicio);

    return ejercicioEncontrado!;
  }

  const initialEjercicio = getRandom();
  const [ejercicioRandom, setEjercicioRandom] = useState<EjercicioJs>(initialEjercicio);

  function handleOnClick() {
    const ejer = getRandom();

    setEjercicioRandom(ejer);
  }

  return (
    <main className="m-auto flex min-h-[100vh] flex-col justify-center">
      <section className="justify-center">
        <article className="mx-80 flex justify-center">
          <p>{ejercicioRandom?.ejercicio}</p>
        </article>
        {ejercicioRandom ? (
          <article className="mt-12 flex justify-center">
            <RadioGroup>
              {ejercicioRandom.opciones.map((opcion) => (
                <div key={opcion} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={opcion} />
                  <Label>{opcion}</Label>
                </div>
              ))}
            </RadioGroup>
          </article>
        ) : null}
        <article className="mx-80 flex justify-between">
          <article className="flex size-1/3 flex-col">
            <Button onClick={handleOnClick}>Randomize</Button>
          </article>
          <article className="flex size-1/3 flex-col">
            <Button>Submit</Button>
          </article>
        </article>
      </section>
    </main>
  );
}
