import { useEffect, useState } from "react"
import { Box, ImageIcon, Play, Search, Square, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/lib/axios"
import { Container } from "@/models/Container"
import { Images } from "@/models/Images"
import { Input } from "./ui/input"
import { HeaderComponent } from "./header-component"
import { SidebarComponent } from "./sidebar-component"
import { ImagesTable } from "./image-table"
import { SearchInput } from "./search-input"
import { ContainersTable } from "./container-table"

export function DockerManagerComponent() {
  const [selectedView, setSelectedView] = useState<"containers" | "images">("images")
  const [containers, setContainers] = useState<Container[]>([]);
  const [images, setImages] = useState<Images[]>([]);
  const [busca, setBusca] = useState<string>('');
  const containerFiltrado = containers.filter(container => container.Names[0].startsWith(busca));
  const imagemFiltrada = images.filter(image => image.RepoTags[0].startsWith(busca));
  

  useEffect(() => {
    const fetchData = async () => {
      const container = await api.get('/api/containers');
      const images = await api.get('/api/images');
      setImages(images.data);
      setContainers(container.data);
      console.log(containers)
    }
    fetchData();
  }, []);

  const handleRemoveContainer = async (containerId: string) => {
    try {
      await api.delete(`/api/containers/${containerId}`);
      setContainers(prevContainers =>
        prevContainers.filter(container => container.Id !== containerId)
      );
      console.log(`Container ${containerId} removed`);
    } catch (error) {
      console.error(`Error removing container ${containerId}:`, error);
    }
  };
  const handleStartContainer = async (containerId: string) => {
    try {
      await api.post(`/api/containers/${containerId}/start`);
      setContainers(prevContainers =>
        prevContainers.map(container =>
          container.Id === containerId
            ? { ...container, State: 'running' }
            : container
        )
      );

      const handleStopContainer = async (containerId: string) => {
        try {
          await api.post(`/api/containers/${containerId}/stop`);
          setContainers(prevContainers =>
            prevContainers.map(container =>
              container.Id === containerId
                ? { ...container, State: 'exited' }
                : container
            )
          );
          console.log(`Container ${containerId} stopped`);
        } catch (error) {
          console.error(`Error stopping container ${containerId}:`, error);
        }
      };
    
    
      return (
        <div className="flex flex-col h-screen">
          <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
              </svg>
              <h1 className="text-xl font-bold">docker</h1>
            </div>
          </header>
    
          <div className="flex flex-1 overflow-hidden">
            <nav className="w-48 bg-gray-100 p-4">
              <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as "containers" | "images")} className="w-full">
                <TabsList className="grid w-full grid-cols-1 mb-4">
                  <TabsTrigger value="containers" className="flex items-center justify-start px-2 py-1" onClick={() => setBusca('')}>
                    <Box className="mr-2 h-4 w-4" />
                    Containers
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex items-center justify-start px-2 py-1" onClick={() => setBusca('')}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Images
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </nav>
    
            <main className="flex-1 overflow-auto p-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Pesquisar containers e imagens..."
                    className="pl-8"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
              </div>
              {selectedView === "images" && (
                <>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Images</h2>
                  </div>
                  <Tabs defaultValue="local" className="w-full">
                    <TabsContent value="local">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>REPOSITORY</TableHead>
                            <TableHead>IMAGE ID</TableHead>
                            <TableHead>CREATED</TableHead>
                            <TableHead>SIZE</TableHead>
                            <TableHead>ACTIONS</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {imagemFiltrada.map((image) => (
                            <TableRow key={image.Id}>
                              <TableCell>
                              </TableCell>
                              <TableCell>{image.RepoTags[0]}</TableCell>
                              <TableCell>{image.Id}</TableCell>
                              <TableCell>{image.Created}</TableCell>
                              <TableCell>{image.Size}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
    
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </>
              )}
    
              {selectedView === "containers" && (
                <div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Containers</h2>
    
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead>IMAGE</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>CREATED</TableHead>
                        <TableHead>ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {containerFiltrado.map((container) => (
                        <TableRow key={container.Id}>
                          <TableCell>
                          </TableCell>
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
    
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  container.State === 'running'
                                    ? handleStopContainer(container.Id)
                                    : handleStartContainer(container.Id)
                                }
                              >
                                {container.State === 'running' ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                <span className="sr-only">
                                  {container.State === 'running' ? 'Stop' : 'Start'} container
                                </span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveContainer(container.Id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
    
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </main>
          </div>
        </div>
      )
      console.log(`Container ${containerId} started`);
    } catch (error) {
      console.error(`Error starting container ${containerId}:`, error);
    }
  };

  const handleStopContainer = async (containerId: string) => {
    try {
      await api.post(`/api/containers/${containerId}/stop`);
      setContainers(prevContainers =>
        prevContainers.map(container =>
          container.Id === containerId
            ? { ...container, State: 'exited' }
            : container
        )
      );
      console.log(`Container ${containerId} stopped`);
    } catch (error) {
      console.error(`Error stopping container ${containerId}:`, error);
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />
      <div className="flex flex-1 overflow-hidden">
        <SidebarComponent selectedView={selectedView} onViewChange={setSelectedView} />
        <main className="flex-1 overflow-auto p-6">
          <SearchInput value={busca} onChange={setBusca} />
          {selectedView === "images" && <ImagesTable images={images.filter((img) => img.RepoTags[0].startsWith(busca))} />}
          {selectedView === "containers" && (
            <ContainersTable
              containers={containers.filter((ctr) => ctr.Names[0].startsWith(busca))}
              onStart={handleStartContainer}
              onStop={handleStopContainer}
              onRemove={handleRemoveContainer}
            />
          )}
        </main>
      </div>
    </div>
  )
}