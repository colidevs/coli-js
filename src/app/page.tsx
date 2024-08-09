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

export default function HomePage() {
  const ejercicios: EjercicioJs[] = mock as EjercicioJs[];
  const {selectedCategory} = useContext(DifficultyContext);

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
      <section>
        <section className="flex flex-col justify-center border border-sky-500 p-10">
          <article className="mx-80 mt-5 border border-sky-500">
            <p className="p-32 text-2xl">{ejercicioRandom?.enunciado}</p>
          </article>
          {ejercicioRandom ? (
            <form className="mx-80 mt-12 flex flex-col">
              <RadioGroup className="w-[42rem] space-y-2" onValueChange={handleOptionChange}>
                {ejercicioRandom.opciones.map((opcion) => (
                  <div
                    key={opcion}
                    className="flex h-16 items-center space-x-3 rounded-xl border border-sky-500 bg-slate-800 p-6"
                  >
                    <RadioGroupItem value={opcion + ejercicioRandom.id} />
                    <Label className="text-xl">{opcion}</Label>
                  </div>
                ))}
              </RadioGroup>
            </form>
          ) : null}
        </section>
        <div className="flex gap-2 p-8">
          <Button
            className="h-14 w-full"
            onClick={() => setEjercicioRandom(getRandom(selectedCategory))}
          >
            Siguiente
          </Button>
          <Button className="h-14 w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </section>
    </main>
  );
}
