"use client";

import {useState, useContext, useEffect} from "react";

import {DifficultyContext} from "../difficultyContext";

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
  completed: boolean;
}

const solvedEjerciciosJs = new Array(mock.length).fill(false);

export default function HomePage() {
  const ejercicios: EjercicioJs[] = mock as EjercicioJs[];
  const {selectedCategory, setSelectedCategory} = useContext(DifficultyContext);

  function getRandom(nivel: string): EjercicioJs {
    const ejerciciosniveles = ejercicios.filter(
      (ejercicio) => ejercicio.dificultad === nivel && ejercicio.completed,
    );

    const NumeroRandom = Math.floor(Math.random() * ejerciciosniveles.length);

    return ejerciciosniveles[NumeroRandom];
  }

  const [ejercicioRandom, setEjercicioRandom] = useState<EjercicioJs>(getRandom(selectedCategory));
  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    setEjercicioRandom(getRandom(selectedCategory));
  }, [selectedCategory]);

  function handleSubmit() {
    /////ERROR/////////////////
    const cleanedOption = selectedOption?.replace(ejercicioRandom.id.toString(), "");

    console.log(ejercicioRandom.correcta);
    console.log(cleanedOption);

    if (cleanedOption === ejercicioRandom.correcta) {
      ejercicios.map((preg) =>
        preg.enunciado === ejercicioRandom.enunciado ? (preg.completed = false) : "",
      );
      alert("¡Correcto!");
      setEjercicioRandom(getRandom(selectedCategory));
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
                  <RadioGroupItem value={opcion + ejercicioRandom.id} />
                  <Label>{opcion}</Label>
                </div>
              ))}
            </RadioGroup>
          </article>
        ) : null}
        <article className="mx-80 flex justify-between">
          <article className="flex size-1/3 flex-col">
            <Button onClick={() => setEjercicioRandom(getRandom(selectedCategory))}>
              Randomize
            </Button>
          </article>
          <article className="flex size-1/3 flex-col">
            <Button onClick={handleSubmit}>Submit</Button>
          </article>
        </article>
      </section>
    </main>
  );
}
