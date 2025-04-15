
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash, CheckCircle, XCircle, Database } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface KnowledgeSource {
  id: string;
  name: string;
  url: string;
  type: 'website' | 'pdf' | 'text';
  status: 'active' | 'inactive';
  last_synced: string | null;
  sync_interval: number;
}

const KnowledgeBaseManager = () => {
  const [open, setOpen] = useState(false);
  const [editSource, setEditSource] = useState<KnowledgeSource | null>(null);
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceType, setSourceType] = useState<'website' | 'pdf' | 'text'>('website');
  const [sourceStatus, setSourceStatus] = useState<'active' | 'inactive'>('active');
  const [syncInterval, setSyncInterval] = useState<number>(24);
  const { toast } = useToast()
  const queryClient = useQueryClient();

  // Fetch knowledge sources
  const { data: knowledgeSources, isLoading, isError } = useQuery({
    queryKey: ['knowledgeSources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data as KnowledgeSource[];
    },
  });

  // Add knowledge source mutation
  const addKnowledgeSourceMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('knowledge_sources')
        .insert([
          {
            name: sourceName,
            url: sourceUrl,
            type: sourceType,
            status: sourceStatus,
            sync_interval: syncInterval,
          },
        ]);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      setOpen(false);
      setSourceName('');
      setSourceUrl('');
      setSourceType('website');
      setSourceStatus('active');
      setSyncInterval(24);
      toast({
        title: "Fuente de conocimiento agregada",
        description: "La fuente de conocimiento ha sido agregada exitosamente.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  });

  // Update knowledge source mutation
  const updateKnowledgeSourceMutation = useMutation({
    mutationFn: async (sourceId: string) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .update({
          name: sourceName,
          url: sourceUrl,
          type: sourceType,
          status: sourceStatus,
          sync_interval: syncInterval,
        })
        .eq('id', sourceId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      setOpen(false);
      setEditSource(null);
      setSourceName('');
      setSourceUrl('');
      setSourceType('website');
      setSourceStatus('active');
      setSyncInterval(24);
      toast({
        title: "Fuente de conocimiento actualizada",
        description: "La fuente de conocimiento ha sido actualizada exitosamente.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  });

  // Delete knowledge source mutation
  const deleteKnowledgeSourceMutation = useMutation({
    mutationFn: async (sourceId: string) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .delete()
        .eq('id', sourceId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento eliminada",
        description: "La fuente de conocimiento ha sido eliminada exitosamente.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  });

  // Sync knowledge source mutation
  const syncKnowledgeSourceMutation = useMutation({
    mutationFn: async (sourceId: string) => {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update last_synced timestamp
      const { error } = await supabase
        .from('knowledge_sources')
        .update({ last_synced: new Date().toISOString() })
        .eq('id', sourceId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento sincronizada",
        description: "La fuente de conocimiento ha sido sincronizada exitosamente.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  });

  const handleEdit = (source: KnowledgeSource) => {
    setEditSource(source);
    setSourceName(source.name);
    setSourceUrl(source.url);
    setSourceType(source.type);
    setSourceStatus(source.status);
    setSyncInterval(source.sync_interval);
    setOpen(true);
  };

  const handleCancelEdit = () => {
    setOpen(false);
    setEditSource(null);
    setSourceName('');
    setSourceUrl('');
    setSourceType('website');
    setSourceStatus('active');
    setSyncInterval(24);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-auxilio-azul">Gestor de Base de Conocimiento</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Añadir nueva fuente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editSource ? 'Editar' : 'Añadir'} Fuente de Conocimiento</DialogTitle>
              <DialogDescription>
                Añade o edita una fuente de conocimiento para mejorar la base de datos de la IA.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" value={sourceName} onChange={(e) => setSourceName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input id="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select value={sourceType} onValueChange={(value) => setSourceType(value as 'website' | 'pdf' | 'text')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Sitio Web</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="text">Texto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <Select value={sourceStatus} onValueChange={(value) => setSourceStatus(value as 'active' | 'inactive')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sync_interval" className="text-right">
                  Intervalo de Sincronización (horas)
                </Label>
                <Input
                  type="number"
                  id="sync_interval"
                  value={syncInterval.toString()}
                  onChange={(e) => setSyncInterval(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={handleCancelEdit}>Cancelar</Button>
              <Button
                className="ml-2"
                onClick={() => {
                  if (editSource) {
                    updateKnowledgeSourceMutation.mutate(editSource.id);
                  } else {
                    addKnowledgeSourceMutation.mutate();
                  }
                }}
                disabled={addKnowledgeSourceMutation.isPending || updateKnowledgeSourceMutation.isPending}
              >
                {editSource ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableCaption>Lista de fuentes de conocimiento disponibles.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Sincronización</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Cargando...</TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Error al cargar los datos.</TableCell>
              </TableRow>
            )}
            {knowledgeSources?.map((source) => (
              <TableRow key={source.id}>
                <TableCell className="font-medium">{source.name}</TableCell>
                <TableCell><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-auxilio-azul hover:underline">{source.url}</a></TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>
                  <Badge variant={source.status === 'active' ? 'outline' : 'secondary'}>
                    {source.status === 'active' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>{source.last_synced ? new Date(source.last_synced).toLocaleDateString() : 'Nunca'}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(source)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => syncKnowledgeSourceMutation.mutate(source.id)}
                    disabled={syncKnowledgeSourceMutation.isPending}
                  >
                    {syncKnowledgeSourceMutation.isPending ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 mr-2" />
                        Sincronizar
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteKnowledgeSourceMutation.mutate(source.id)}
                    disabled={deleteKnowledgeSourceMutation.isPending}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {knowledgeSources?.length === 0 && !isLoading && !isError && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No hay fuentes de conocimiento añadidas.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default KnowledgeBaseManager;
