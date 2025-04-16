
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Upload, X, ArrowLeft, Info, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Ampliado el esquema de validación con más opciones y validación de tamaño de archivo
const formSchema = z.object({
  title: z.string().min(3, { message: 'El título debe tener al menos 3 caracteres' }),
  type: z.enum(['image', 'video', 'document', 'audio', 'presentation', 'infographic']),
  url: z.string().url({ message: 'Debe ser una URL válida' }).optional().or(z.literal('')),
  content: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  category: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const SUPPORTED_FILE_TYPES = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  video: ['.mp4', '.webm', '.avi', '.mov', '.mkv'],
  document: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a'],
  presentation: ['.ppt', '.pptx', '.key'],
  infographic: ['.jpg', '.jpeg', '.png', '.pdf']
};

const MediaUploadForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([
    'Primeros Auxilios', 
    'Emergencias', 
    'Técnicas', 
    'Guías', 
    'Cursos', 
    'General'
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'image',
      url: '',
      content: '',
      description: '',
      tags: '',
      category: ''
    }
  });

  // Reset file error when form type changes
  useEffect(() => {
    if (file && fileError) {
      validateFile(file, form.getValues('type'));
    }
  }, [form.watch('type')]);

  const validateFile = (file: File, fileType: string): boolean => {
    // Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`El archivo es demasiado grande. El tamaño máximo es ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      return false;
    }

    // Validar tipo
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const supportedExtensions = SUPPORTED_FILE_TYPES[fileType as keyof typeof SUPPORTED_FILE_TYPES];
    
    if (!supportedExtensions.includes(fileExtension)) {
      setFileError(`Tipo de archivo no válido para ${fileType}. Tipos aceptados: ${supportedExtensions.join(', ')}`);
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile, form.getValues('type'))) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile, form.getValues('type'))) {
        setFile(selectedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const simulateUploadProgress = () => {
    // Simulación de progreso para mejorar UX
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    return interval;
  };

  const onSubmit = async (values: FormValues) => {
    if (file && fileError) {
      toast({
        title: 'Error en el archivo',
        description: fileError,
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    setUploadProgress(0);
    const progressInterval = simulateUploadProgress();
    
    try {
      // Process file upload if a file is selected
      let fileUrl = values.url;
      let thumbnailUrl = null;
      
      if (file) {
        // Generate a unique file name
        const fileExt = file.name.split('.').pop();
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${values.type}/${fileName}`;
        
        // Crear el bucket si no existe
        const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('media');
        if (bucketError && bucketError.message.includes('does not exist')) {
          await supabase.storage.createBucket('media', {
            public: true,
            fileSizeLimit: MAX_FILE_SIZE
          });
        }
        
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });
          
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
          
        fileUrl = publicUrl;
        
        // Si es imagen, generar miniatura usando la misma URL
        if (values.type === 'image') {
          thumbnailUrl = publicUrl;
        }
      }
      
      // Save media information to database
      const { data, error } = await supabase
        .from('media_library')
        .insert({
          title: values.title,
          type: values.type,
          url: fileUrl,
          thumbnail: thumbnailUrl,
          content: values.content || null,
          description: values.description || null,
          tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
          category: values.category || 'General',
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select();
        
      if (error) throw error;
      
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      toast({
        title: 'Éxito',
        description: 'El medio ha sido subido correctamente',
      });
      
      setTimeout(() => navigate('/admin/media'), 1000);
    } catch (error: any) {
      clearInterval(progressInterval);
      console.error('Error uploading media:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo subir el medio. Por favor, intenta de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate('/admin/media')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Subir Nuevo Medio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduce un título" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (file) {
                            validateFile(file, value);
                          }
                        }} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Imagen</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Documento</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="presentation">Presentación</SelectItem>
                          <SelectItem value="infographic">Infografía</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      El tipo de medio determina cómo se mostrará en la biblioteca
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Categoría a la que pertenece este medio
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiquetas (separadas por comas)</FormLabel>
                    <FormControl>
                      <Input placeholder="primeros auxilios, emergencia, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Añade etiquetas separadas por comas para facilitar la búsqueda
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dropzone con validación y soporte para arrastrar y soltar */}
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-colors ${
                dragActive 
                  ? 'border-auxilio-azul bg-blue-50' 
                  : fileError 
                    ? 'border-red-400 bg-red-50'
                    : file 
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {file ? (
                <div>
                  <div className="mb-2">
                    <p className="font-medium text-auxilio-azul">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setFileError(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-700">Arrastra y suelta archivos aquí</p>
                  <p className="text-sm text-gray-500 mb-4">o</p>
                  <label className="cursor-pointer inline-block">
                    <Button type="button" variant="outline">
                      Seleccionar archivos
                    </Button>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              )}
              
              {fileError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{fileError}</AlertDescription>
                </Alert>
              )}
              
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Tamaño máximo: {MAX_FILE_SIZE / (1024 * 1024)}MB. Formatos soportados según tipo:
                </p>
                <p className="text-xs text-gray-500">
                  {form.getValues('type') && 
                    `${form.getValues('type')}: ${SUPPORTED_FILE_TYPES[form.getValues('type') as keyof typeof SUPPORTED_FILE_TYPES].join(', ')}`
                  }
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL externa (opcional si has subido un archivo)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Introduce una URL externa si no estás subiendo un archivo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido incrustado (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="<iframe src='...'></iframe>" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Para videos de YouTube o contenido incrustado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe este recurso..." 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Progreso de subida</span>
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate('/admin/media')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading || (!!file && !!fileError)}>
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Medio
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MediaUploadForm;
