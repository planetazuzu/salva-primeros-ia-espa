
import React from 'react';
import { KnowledgeSource } from './types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KnowledgeSourceFormProps {
  editSource: KnowledgeSource | null;
  sourceName: string;
  setSourceName: (value: string) => void;
  sourceUrl: string;
  setSourceUrl: (value: string) => void;
  sourceType: 'website' | 'pdf' | 'text';
  setSourceType: (value: 'website' | 'pdf' | 'text') => void;
  sourceStatus: 'active' | 'inactive';
  setSourceStatus: (value: 'active' | 'inactive') => void;
  syncInterval: number;
  setSyncInterval: (value: number) => void;
  onCancel: () => void;
  onSave: () => void;
  isPending: boolean;
}

const KnowledgeSourceForm: React.FC<KnowledgeSourceFormProps> = ({
  editSource,
  sourceName,
  setSourceName,
  sourceUrl,
  setSourceUrl,
  sourceType,
  setSourceType,
  sourceStatus,
  setSourceStatus,
  syncInterval,
  setSyncInterval,
  onCancel,
  onSave,
  isPending,
}) => {
  return (
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
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button
          onClick={onSave}
          disabled={isPending}
        >
          {editSource ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default KnowledgeSourceForm;
