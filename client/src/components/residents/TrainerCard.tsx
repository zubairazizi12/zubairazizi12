import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trainer } from "server/models/Trainers";

interface TrainerCardProps {
  trainer: Trainer;
  onClick: () => void;
}

export default function TrainerCard({ trainer, onClick }: TrainerCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer p-4"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={""} alt={trainer.name} />
          <AvatarFallback>{trainer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">
            {trainer.name} {trainer.lastName}
          </h3>
          <p className="text-sm text-slate-600">{trainer.department}</p>
          <p className="text-xs text-slate-500">
            Joined: {new Date("").toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-2 flex space-x-2">
        <Badge className="bg-hospital-green-100 text-hospital-green-800">
          {trainer.status}
        </Badge>
        <Badge className="bg-blue-100 text-blue-800">{trainer.specialty}</Badge>
      </div>
    </div>
  );
}
