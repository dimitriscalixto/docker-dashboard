import { Play, Square, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Container } from "@/models/Container";

interface ContainersTableProps {
  containers: Container[];
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRemove: (id: string) => void;
}

export const  ContainersTable = ({ containers, onStart, onStop, onRemove }: ContainersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>IMAGE</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>CREATED</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {containers.map((container) => (
          <TableRow key={container.Id}>
            <TableCell></TableCell>
            <TableCell>{container.Names[0]}</TableCell>
            <TableCell>{container.Image}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${container.State === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {container.State}
              </span>
            </TableCell>
            <TableCell>{container.Created}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => (container.State === 'running' ? onStop(container.Id) : onStart(container.Id))}>
                  {container.State === 'running' ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => onRemove(container.Id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
