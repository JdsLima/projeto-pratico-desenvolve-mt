import { Skeleton } from "@radix-ui/themes";

interface PeopleResumeProps {
  desaparecidas: number;
  encontradas: number;
  isLoading: boolean;
}

export const PeopleResume = ({
  desaparecidas,
  encontradas,
  isLoading,
}: PeopleResumeProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h5 className="text-lg font-semibold text-gray-700">Desaparecidos</h5>
          {isLoading ? (
            <Skeleton>Loading</Skeleton>
          ) : (
            <p className="text-3xl font-bold text-red-600">{desaparecidas}</p>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h5 className="text-lg font-semibold text-gray-700">Localizados</h5>

          {isLoading ? (
            <Skeleton>Loading</Skeleton>
          ) : (
            <p className="text-3xl font-bold text-green-600">{encontradas}</p>
          )}
        </div>
      </div>
    </div>
  );
};
