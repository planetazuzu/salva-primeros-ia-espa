
import React from 'react';
import { KnowledgeSource } from './types';
import { Pencil, Trash, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KnowledgeSourceTableProps {
  sources: KnowledgeSource[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (source: KnowledgeSource) => void;
  onSync: (sourceId: string) => void;
  onDelete: (sourceId: string) => void;
  isSyncing: boolean;
  syncingId: string | null;
  isDeleting: boolean;
}

const KnowledgeSourceTable: React.FC<KnowledgeSourceTableProps> = ({
  sources,
  isLoading,
  isError,
  onEdit,
  onSync,
  onDelete,
  isSyncing,
  syncingId,
  isDeleting,
}) => {
  return (
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
          {sources?.map((source) => (
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
                <Button variant="ghost" size="sm" onClick={() => onEdit(source)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSync(source.id)}
                  disabled={isSyncing && syncingId === source.id}
                >
                  {isSyncing && syncingId === source.id ? (
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
                  onClick={() => onDelete(source.id)}
                  disabled={isDeleting}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {sources?.length === 0 && !isLoading && !isError && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No hay fuentes de conocimiento añadidas.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default KnowledgeSourceTable;
