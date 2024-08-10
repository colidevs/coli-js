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
  opciones?: string[];
  correcta?: string;
  dificultad?: string;
  completed?: boolean;
}

export default function HomePage() {
  const ejercicios: EjercicioJs[] = mock as EjercicioJs[];
  const {selectedCategory} = useContext(DifficultyContext);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [ejercicioRandom, setEjercicioRandom] = useState<EjercicioJs>(getRandom(selectedCategory));
  const [selectedOption, setSelectedOption] = useState<string>();

  function getRandom(nivel: string): EjercicioJs {
    const ejerciciosniveles = ejercicios.filter(
      (ejercicio) => ejercicio.dificultad === nivel && ejercicio.completed,
    );

    if (ejerciciosniveles.length === 0) {
      return ejercicios[18];
    }
    const NumeroRandom = Math.floor(Math.random() * ejerciciosniveles.length);

    return ejerciciosniveles[NumeroRandom];
  }

  useEffect(() => {
    setEjercicioRandom(getRandom(selectedCategory));
    setCounter(0);
    ejercicios.map((preg) => (preg.completed = true));
  }, [selectedCategory]);

  function handleOptionChange(value: string) {
    setSelectedOption(value);
    const cleanedOption = value.replace(ejercicioRandom.id.toString(), "");

    setIsCorrect(cleanedOption === ejercicioRandom.correcta);

    ejercicios.map((preg) =>
      preg.enunciado === ejercicioRandom.enunciado ? (preg.completed = false) : "",
    );
  }

  function handleNext() {
    if (isCorrect !== null) {
      setCounter((old) => old + 1);
      setEjercicioRandom(getRandom(selectedCategory));
      setIsCorrect(null);
    }
  }

  return (
    <main className="m-auto flex min-h-[100vh] flex-col ">
      <section className="mx-auto mt-2 flex w-full max-w-4xl flex-col justify-center bg-gray-950 p-10 outline-double outline-gray-900">
        <div>
          {ejercicios.filter((ejercicio) => ejercicio.dificultad === selectedCategory).length}/
          {counter}
          <div className="flex">{ejercicioRandom?.dificultad}</div>
        </div>
        <article className="mt-5 rounded-xl shadow-[0_0_20px_cyan] outline-double outline-blue-500">
          <p className="p-32 text-center font-mono text-2xl font-semibold text-amber-400">
            {ejercicioRandom?.enunciado}
          </p>
        </article>
        {ejercicioRandom ? (
          <form className="mt-12 flex w-full flex-col">
            <RadioGroup className="w-full space-y-2" onValueChange={handleOptionChange}>
              {ejercicioRandom.opciones?.map((opcion) => {
                const isSelected = selectedOption === opcion + ejercicioRandom.id;

                return (
                  <Label
                    key={opcion}
                    className={`flex h-16 w-full cursor-pointer items-center space-x-3 rounded-xl p-6 font-mono outline-double outline-blue-500 ${
                      isSelected
                        ? isCorrect === true
                          ? "bg-green-500"
                          : isCorrect === false
                            ? "bg-red-500"
                            : "bg-slate-800"
                        : "bg-gradient-to-t from-slate-800 to-slate-900"
                    }`}
                  >
                    <RadioGroupItem value={opcion + ejercicioRandom.id} />
                    <span className="ms-3">{opcion}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </form>
        ) : null}
      </section>
      <div className="mx-auto mt-8 flex w-full max-w-4xl gap-2">
        <Button className="h-14 w-full text-lg" disabled={isCorrect === null} onClick={handleNext}>
          Siguiente
        </Button>
      </div>
    </main>
  );
}
