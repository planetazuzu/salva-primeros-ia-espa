
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useKnowledgeSources } from './useKnowledgeSources';
import { useKnowledgeSourceMutations } from './useKnowledgeSourceMutations';
import KnowledgeSourceForm from './KnowledgeSourceForm';
import KnowledgeSourceTable from './KnowledgeSourceTable';
import { KnowledgeSource } from './types';

const KnowledgeBaseManager = () => {
  const [open, setOpen] = useState(false);
  const [editSource, setEditSource] = useState<KnowledgeSource | null>(null);
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceType, setSourceType] = useState<'website' | 'pdf' | 'text'>('website');
  const [sourceStatus, setSourceStatus] = useState<'active' | 'inactive'>('active');
  const [syncInterval, setSyncInterval] = useState<number>(24);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Fetch knowledge sources
  const { data: knowledgeSources, isLoading, isError } = useKnowledgeSources();

  // Use mutations
  const {
    addKnowledgeSource,
    updateKnowledgeSource,
    deleteKnowledgeSource,
    syncKnowledgeSource
  } = useKnowledgeSourceMutations();

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

  const handleSave = () => {
    if (editSource) {
      updateKnowledgeSource.mutate({
        id: editSource.id,
        name: sourceName,
        url: sourceUrl,
        status: sourceStatus
      });
    } else {
      addKnowledgeSource.mutate({
        name: sourceName,
        url: sourceUrl,
        status: sourceStatus
      });
    }
    setOpen(false);
    setEditSource(null);
    setSourceName('');
    setSourceUrl('');
    setSourceType('website');
    setSourceStatus('active');
    setSyncInterval(24);
  };

  const handleSync = (sourceId: string) => {
    setSyncingId(sourceId);
    syncKnowledgeSource.mutate(sourceId, {
      onSettled: () => {
        setSyncingId(null);
      }
    });
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
          <KnowledgeSourceForm
            editSource={editSource}
            sourceName={sourceName}
            setSourceName={setSourceName}
            sourceUrl={sourceUrl}
            setSourceUrl={setSourceUrl}
            sourceType={sourceType}
            setSourceType={setSourceType}
            sourceStatus={sourceStatus}
            setSourceStatus={setSourceStatus}
            syncInterval={syncInterval}
            setSyncInterval={setSyncInterval}
            onCancel={handleCancelEdit}
            onSave={handleSave}
            isPending={addKnowledgeSource.isPending || updateKnowledgeSource.isPending}
          />
        </Dialog>
      </div>

      <KnowledgeSourceTable
        sources={knowledgeSources || []}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onSync={handleSync}
        onDelete={(sourceId) => deleteKnowledgeSource.mutate(sourceId)}
        isSyncing={syncKnowledgeSource.isPending}
        syncingId={syncingId}
        isDeleting={deleteKnowledgeSource.isPending}
      />
    </div>
  );
};

export default KnowledgeBaseManager;
