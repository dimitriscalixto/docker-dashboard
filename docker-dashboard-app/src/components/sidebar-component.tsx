import { Box, Container, ImageIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface SidebarProps {
  selectedView: "containers" | "images";
  onViewChange: (view: "containers" | "images") => void;
}

export const SidebarComponent = ({ selectedView, onViewChange }: SidebarProps) =>{
  return (
    <nav className="w-48 bg-gray-100 p-4">
      <Tabs value={selectedView} onValueChange={(value) => onViewChange(value as "containers" | "images")}>
        <TabsList className="grid w-full grid-cols-1 mb-4">
          <TabsTrigger value="containers" className="flex items-center justify-start px-2 py-1">
            <Box className="mr-2 h-4 w-4"/>
            Containers
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center justify-start px-2 py-1">
            <ImageIcon className="mr-2 h-4 w-4" />
            Images
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
