import { Select, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "./ui/Button";

export interface filterProps {
  name: string;
  minAge: number;
  maxAge: number;
  gender: string;
  status: string;
}

interface FilterPersonProps {
  handleSearch: ({ name, minAge, maxAge, gender, status }: filterProps) => void;
}

export function FilterPerson({ handleSearch }: FilterPersonProps) {
  const [name, setName] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const handleClear = () => {
    setName("");
    setMinAge(0);
    setMaxAge(0);
    setGender("");
    setStatus("");
  };

  return (
    <div className="w-full border rounded-2xl p-5 mx-auto space-y-4 mb-8">
      <h4 className="text-left">
        Filtros disponíveis para uma busca mais precisa
      </h4>
      <Separator style={{ width: "100%" }} />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col w-full sm:w-2/6">
          <label htmlFor="name-filter" className="mb-1 font-medium text-left">
            Nome
          </label>
          <input
            id="name-filter"
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-[8px] bg-white text-black"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/6">
          <label htmlFor="min-age" className="mb-1 font-medium text-left">
            Idade mínima
          </label>
          <input
            id="min-age"
            type="number"
            min="0"
            placeholder="0"
            value={minAge}
            onChange={(e) => setMinAge(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-[8px] bg-white text-black"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/6">
          <label htmlFor="max-age" className="mb-1 font-medium text-left">
            Idade máxima
          </label>
          <input
            id="max-age"
            type="number"
            min="0"
            placeholder="99"
            value={maxAge}
            onChange={(e) => setMaxAge(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-[8px] bg-white text-black"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/6">
          <label htmlFor="gender-filter" className="mb-1 font-medium text-left">
            Gênero
          </label>
          <Select.Root size={"3"} value={gender} onValueChange={setGender}>
            <Select.Trigger id="gender-filter" />
            <Select.Content>
              <Select.Item value="Todos">Todos</Select.Item>
              <Select.Item value="MASCULINO">Masculino</Select.Item>
              <Select.Item value="FEMININO">Feminino</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div className="flex flex-col w-full sm:w-1/6">
          <label htmlFor="status-filter" className="mb-1 font-medium text-left">
            Status
          </label>
          <Select.Root size={"3"} value={status} onValueChange={setStatus}>
            <Select.Trigger id="status-filter" />
            <Select.Content>
              <Select.Item value="Todos">Todos</Select.Item>
              <Select.Item value="DESAPARECIDO">Desaparecido</Select.Item>
              <Select.Item value="LOCALIZADO">Localizado</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
        <Button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-300 transition"
        >
          Limpar
        </Button>
        <Button
          onClick={() => handleSearch({ name, minAge, maxAge, gender, status })}
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
