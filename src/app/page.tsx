"use client";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export default function HomePage() {
  interface ejercicio_js {
    id: number;
    ejercicio: string;
  }
  ///hook para cambiar el estado de la propiedad ejercicio del objeto.
  const [ejercicioRandom, setEjercicioRandom] = useState<string>();

  const ejercicios: ejercicio_js[] = [
    {
      id: 1,
      ejercicio: "1- ¿Cuál es el resultado de 2 + '2' en JavaScript?",
    },
    {
      id: 2,
      ejercicio: "2- ¿Qué valor imprimirá la siguiente línea de código?",
    },
    {
      id: 3,
      ejercicio: "3 ¿Qué método se utiliza para convertir una cadena de texto a un número entero?",
    },
    {
      id: 4,
      ejercicio: "4- ¿Cuál es la salida de la siguiente expresión?",
    },
    // {
    //   id: 6,
    //   ejercicio: " ¿Qué valor imprimirá la siguiente función?",
    //   op 1  op 2 op 3 op 4 correcta
    // },
    // {
    //   id: 7,
    //   ejercicio: " ¿Cuál es la diferencia principal entre ‘let’ y ‘var’ en JavaScript?",
    // },
    // {
    //   id: 8,
    //   ejercicio: " ¿Qué imprimirá la siguiente línea de código?",
    // },
    // {
    //   id: 9,
    //   ejercicio: " ¿Qué hará el siguiente código? ",
    // },
    // {
    //   id: 10,
    //   ejercicio: " ¿Cuál es el propósito de la declaración ‘use strict’ en JavaScript?",
    // },
    // {
    //   id: 11,
    //   ejercicio:
    //     " Completa la función para que sume dos números e imprima el resultado en la consola.",
    // },
    // {
    //   id: 12,
    //   ejercicio:
    //     " Completa la función para que filtre y retorne solo los números pares de un array dado.",
    // },
    // {
    //   id: 13,
    //   ejercicio:
    //     " Completa la función para que devuelva una promesa que se resuelve con el mensaje `Hecho` después de 1 segundo.",
    // },
    // {
    //   id: 14,
    //   ejercicio:
    //     " Completa la función para que encuentre y retorne el número máximo en un array dado utilizando el método `reduce`.",
    // },
    // {
    //   id: 15,
    //   ejercicio:
    //     " Completa las clases para que ‘Perro’ herede correctamente de ‘Animal’ y pueda acceder al método ‘hacerSonido’.",
    // },
    // {
    //   id: 16,
    //   ejercicio: "Ejercicio 16",
    // },
    // {
    //   id: 17,
    //   ejercicio: "Ejercicio 17",
    // },
    // {
    //   id: 18,
    //   ejercicio: "Ejercicio 18",
    // },
    // {
    //   id: 19,
    //   ejercicio: "Ejercicio 19",
    // },
    // {
    //   id: 20,
    //   ejercicio: "Ejercicio 20",
    // },
    // {
    //   id: 21,
    //   ejercicio: "Ejercicio 21",
    // },
    // {
    //   id: 22,
    //   ejercicio: "Ejercicio 22",
    // },
    // {
    //   id: 23,
    //   ejercicio: "Ejercicio 23",
    // },
    // {
    //   id: 24,
    //   ejercicio: "Ejercicio 24",
    // },
    // {
    //   id: 25,
    //   ejercicio: "Ejercicio 25",
    // },
    // {
    //   id: 26,
    //   ejercicio: "Ejercicio 26",
    // },
    // {
    //   id: 27,
    //   ejercicio: "Ejercicio 27",
    // },
    // {
    //   id: 28,
    //   ejercicio: "Ejercicio 28",
    // },
    // {
    //   id: 29,
    //   ejercicio: "Ejercicio 29",
    // },
    // {
    //   id: 30,
    //   ejercicio: "Ejercicio 30",
    // },
  ];

  const getIDRandom = function () {
    ///const nombresEjercicios = ejercicios.map((ejercicio) => ejercicio.ejercicio);
    const numEjercicio = Math.floor(Math.random() * ejercicios.length) + 1;

    return numEjercicio;
  };

  const getRandomEj = function () {
    const ejercicioEncontrado = ejercicios.find((ejercicio) => ejercicio.id === getIDRandom());

    if (ejercicioEncontrado?.ejercicio === null || ejercicioEncontrado?.ejercicio === undefined) {
      ejercicioEncontrado;
    } else {
      setEjercicioRandom(ejercicioEncontrado?.ejercicio);
    }
  };

  return (
    <main className="m-auto flex min-h-[100vh] flex-col justify-center">
      <section className="justify-center">
        <article className="mx-80 flex justify-center ">
          <p>{ejercicioRandom}</p>
        </article>
        <article className="mt-12 flex justify-center">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem id="r1" value="valor1" />
              <Label htmlFor="r1">let</Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem id="r2" value="valor2" />
              <Label htmlFor="r2">String</Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem id="r3" value="valor3" />
              <Label htmlFor="r3">None</Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem id="r4" value="valor4" />
              <Label htmlFor="r4">None</Label>
            </div>
          </RadioGroup>
        </article>
        <article className="mx-80 flex justify-between">
          <article className="flex size-1/3 flex-col">
            <Button onClick={getRandomEj}>Randomize</Button>
          </article>
          <article className="flex size-1/3 flex-col">
            <Button>Submit</Button>
          </article>
        </article>
      </section>
    </main>
  );
}
