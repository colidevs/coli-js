"use client";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import mock from "@/mocks/default.json";

interface EjercicioJs {
  id: number;
  enunciado: string;
  opciones: string[];
  correcta: string;
  dificultad: string;
}

const solvedEjerciciosJs = new Array(mock.length).fill(false);
export default function HomePage() {
  const ejercicios: EjercicioJs[] = mock as EjercicioJs[];

  function getRandom(): EjercicioJs {
    let numEjercicio = getRandomNumber();

    while (!solvedEjerciciosJs[numEjercicio - 1] === false) {
      numEjercicio = getRandomNumber();
    }
    const ejercicioEncontrado = ejercicios.find((ejercicio) => ejercicio.id === numEjercicio);

    return ejercicioEncontrado!;
  }
  function getRandomNumber() {
    return Math.floor(Math.random() * ejercicios.length) + 1;
  }
  const initialEjercicio = getRandom();
  const [ejercicioRandom, setEjercicioRandom] = useState<EjercicioJs>(initialEjercicio);
  const [selectedOption, setSelectedOption] = useState<string>();

  function handleRandomize() {
    const ejer = getRandom();

    setEjercicioRandom(ejer);
  }

  function handleSubmit() {
    if (selectedOption === ejercicioRandom.correcta) {
      alert("¡Correcto!");
      solvedEjerciciosJs[ejercicioRandom.id - 1] = true;
    } else {
      alert("Respuesta incorrecta. Inténtalo de nuevo.");
    }
  }

  function handleOptionChange(value: string) {
    setSelectedOption(value);
  }

  return (
    <main className="m-auto flex min-h-[100vh] flex-col justify-center">
      <section className="justify-center">
        <article className="mx-80 flex justify-center">
          <p>{ejercicioRandom?.enunciado}</p>
        </article>
        {ejercicioRandom ? (
          <article className="mt-12 flex justify-center">
            <RadioGroup onValueChange={handleOptionChange}>
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
            <Button onClick={handleRandomize}>Randomize</Button>
          </article>
          <article className="flex size-1/3 flex-col">
            <Button onClick={handleSubmit}>Submit</Button>
          </article>
        </article>
      </section>
    </main>
  );
}
