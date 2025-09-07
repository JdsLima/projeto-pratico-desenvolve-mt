import { Card, CardContent, CardFooter } from "@/Components/ui/Card";
import { Calendar, MapPin, User } from "lucide-react";
import { ImageWithFallback } from "@/Components/ui/ImageWithFallback";
import { PessoaDTO } from "@/app/types/types";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@radix-ui/themes";

interface PersonCardProps {
  person: PessoaDTO;
  onViewDetails: (person: PessoaDTO) => void;
}

export function PersonCard({ person, onViewDetails }: PersonCardProps) {
  const statusText =
    person.ultimaOcorrencia.dataLocalizacao === null
      ? "Desaparecido"
      : "Localizado";

  return (
    <Card className="w-full max-w-sm justify-between hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <ImageWithFallback
              src={person.urlFoto}
              alt={person.nome}
              className="w-45 h-45 rounded-full object-cover"
            />
            <Badge
              className="w-full justify-center mt-2.5"
              color={
                person.ultimaOcorrencia.dataLocalizacao === null
                  ? "red"
                  : "blue"
              }
              size={"3"}
            >
              {statusText}
            </Badge>
          </div>

          <div className="text-center space-y-2 w-full">
            <h3 className="font-semibold truncate">{person.nome}</h3>

            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{person.idade} anos</span>
            </div>

            <div className="flex justify-center items-start gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm line-clamp-2">
                {person.ultimaOcorrencia.localDesaparecimentoConcat}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(
                  person.ultimaOcorrencia.dataLocalizacao ??
                    person.ultimaOcorrencia.dtDesaparecimento
                ).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onViewDetails(person)}
          className="w-full"
          variant="outline"
        >
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
