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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function getRandom(nivel: string): EjercicioJs {
    const ejerciciosniveles = ejercicios.filter(
      (ejercicio) => ejercicio.dificultad === nivel && ejercicio.completed,
    );

    const NumeroRandom = Math.floor(Math.random() * ejerciciosniveles.length);

    return ejerciciosniveles[NumeroRandom];
  }

  const [ejercicioRandom, setEjercicioRandom] = useState<EjercicioJs>(getRandom(selectedCategory));
  const [selectedOption, setSelectedOption] = useState<string>();
  const [correctcounter, setcorrectcounter] = useState<number>(0);
  const [incorrectcounter, setincorrectcounter] = useState<number>(0);

  useEffect(() => {
    setEjercicioRandom(getRandom(selectedCategory));
    setcorrectcounter(0);
    setincorrectcounter(0);
  }, [selectedCategory]);

  function handleOptionChange(value: string) {
    setSelectedOption(value);
    const cleanedOption = value.replace(ejercicioRandom.id.toString(), "");

    if (cleanedOption === ejercicioRandom.correcta) {
      setIsCorrect(true);
      ejercicios.map((preg) =>
        preg.enunciado === ejercicioRandom.enunciado ? (preg.completed = false) : "",
      );
      setcorrectcounter(correctcounter + 1);
    } else {
      setIsCorrect(false);
      setincorrectcounter(incorrectcounter + 1);
    }
  }

  function handleSubmit() {
    alert(isCorrect ? "¡Correcto!" : "Respuesta incorrecta. Inténtalo de nuevo.");
    if (isCorrect) {
      setEjercicioRandom(getRandom(selectedCategory));
      setIsCorrect(null); // Reset para la siguiente pregunta
    }
  }

  return (
    <main className="m-auto flex min-h-[100vh] flex-col ">
      <section className="mx-auto mt-2 flex w-full max-w-4xl flex-col justify-center bg-gray-950 p-10 outline-double outline-gray-900">
        <div>5/{correctcounter}</div>
        <article className="mt-5 rounded-xl shadow-[0_0_20px_cyan] outline-double outline-blue-500">
          <p className="p-32 text-center font-mono text-2xl font-semibold text-amber-400">
            {ejercicioRandom?.enunciado}
          </p>
        </article>
        {ejercicioRandom ? (
          <form className="mt-12 flex w-full flex-col">
            <RadioGroup className="w-full space-y-2" onValueChange={handleOptionChange}>
              {ejercicioRandom.opciones.map((opcion) => {
                const isSelected = selectedOption === opcion + ejercicioRandom.id;

                return (
                  <div
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
                    <Label className="text-xl">{opcion}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </form>
        ) : null}
      </section>
      <div className="mx-auto mt-8 flex w-full max-w-4xl gap-2">
        <Button className="h-14 w-full text-lg" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          className="h-14 w-full text-lg"
          onClick={() => setEjercicioRandom(getRandom(selectedCategory))}
        >
          Siguiente
        </Button>
      </div>
    </main>
  );
}
