import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export default function HomePage() {
  return (
    <article className=" size-full justify-center">
      <section className="mx-80 flex justify-center ">
        <p>
          Para crear una variable nueva, en JavaScript por convencion utilizamos la siguiente
          sintaxis...
        </p>
      </section>
      <section className="mt-12 flex justify-center">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem id="r1" value="default" />
            <Label htmlFor="r1">Let</Label>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem id="r2" value="comfortable" />
            <Label htmlFor="r2">String</Label>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem id="r3" value="compact" />
            <Label htmlFor="r3">None</Label>
          </div>
        </RadioGroup>
      </section>
      <section className="mx-80 flex justify-between">
        <section className="flex size-1/3 flex-col">
          <Button>Randomize</Button>
        </section>
        <section className="flex size-1/3 flex-col">
          <Button>Submit</Button>
        </section>
      </section>
    </article>
  );
}
