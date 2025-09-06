import { Card, CardContent, CardFooter } from "./ui/Card";
import { Calendar, MapPin, User } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { Person } from "@/app/types/types";
import { Button } from "./ui/Button";

interface PersonCardProps {
  person: Person;
  onViewDetails: (person: Person) => void;
}

export function PersonCard({ person, onViewDetails }: PersonCardProps) {
  const statusText =
    person.status === "missing" ? "Desaparecido" : "Localizado";

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <ImageWithFallback
              src={person.photo}
              alt={person.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <span className="border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              {statusText}
            </span>
          </div>

          <div className="text-center space-y-2 w-full">
            <h3 className="font-semibold truncate">{person.name}</h3>

            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{person.age} anos</span>
            </div>

            <div className="flex items-start gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm line-clamp-2">
                {person.lastSeen.location}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(person.lastSeen.date).toLocaleDateString("pt-BR")}
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
