import { Images } from "@/models/Images";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface ImagesTableProps {
  images: Images[];
}

export function ImagesTable({ images }: ImagesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>REPOSITORY</TableHead>
          <TableHead>IMAGE ID</TableHead>
          <TableHead>CREATED</TableHead>
          <TableHead>SIZE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((image) => (
          <TableRow key={image.Id}>
            <TableCell></TableCell>
            <TableCell>{image.RepoTags[0]}</TableCell>
            <TableCell>{image.Id}</TableCell>
            <TableCell>{image.Created}</TableCell>
            <TableCell>{image.Size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
