
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, UserCheck, UserX, Shield, User, RefreshCw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Database } from '@/integrations/supabase/types';

type Profile = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  is_approved: boolean;
  created_at: string;
};

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  
  // Fetch user profiles
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ['userProfiles'],
    queryFn: async () => {
      // Check if current user is admin
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No se pudo verificar tu usuario');
      
      const { data: currentProfile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profileError) throw profileError;
      if (currentProfile.role !== 'admin') throw new Error('No tienes permisos de administrador');
      
      // Fetch all profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Get email for each profile
      const profilesWithEmail = await Promise.all(
        data.map(async (profile) => {
          return {
            ...profile,
            email: profile.email
          } as Profile;
        })
      );
      
      return profilesWithEmail;
    }
  });
  
  // Approve user mutation
  const approveUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfiles'] });
      toast({
        title: "Usuario aprobado",
        description: "El usuario ahora puede acceder al sistema",
        duration: 3000
      });
    },
    onError: (error) => {
      console.error("Error al aprobar usuario:", error);
      toast({
        title: "Error",
        description: "No se pudo aprobar al usuario",
        variant: "destructive",
        duration: 3000
      });
    }
  });
  
  // Reject user mutation
  const rejectUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      // This would typically delete the user or mark them as rejected
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_approved: false })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfiles'] });
      toast({
        title: "Usuario rechazado",
        description: "El usuario ha sido rechazado",
        duration: 3000
      });
    },
    onError: (error) => {
      console.error("Error al rechazar usuario:", error);
      toast({
        title: "Error",
        description: "No se pudo rechazar al usuario",
        variant: "destructive",
        duration: 3000
      });
    }
  });
  
  // Toggle admin role mutation
  const toggleAdminMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: isAdmin ? 'admin' : 'user' })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfiles'] });
      toast({
        title: `Rol actualizado`,
        description: `El usuario ahora es ${data.role === 'admin' ? 'administrador' : 'usuario regular'}`,
        duration: 3000
      });
    },
    onError: (error) => {
      console.error("Error al cambiar rol:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el rol del usuario",
        variant: "destructive",
        duration: 3000
      });
    }
  });
  
  const handleApproveUser = (userId: string) => {
    approveUserMutation.mutate(userId);
  };
  
  const handleRejectUser = (userId: string) => {
    rejectUserMutation.mutate(userId);
  };
  
  const handleToggleAdmin = (userId: string, currentRole: 'admin' | 'user') => {
    toggleAdminMutation.mutate({ 
      userId, 
      isAdmin: currentRole === 'user' 
    });
  };
  
  if (profilesLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-auxilio-azul"></div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <UserCheck className="h-5 w-5 text-auxilio-azul mr-2" />
          Gestión de Usuarios
        </h3>
        
        <button 
          className="auxilio-btn-secondary text-sm px-3 py-1 flex items-center"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['userProfiles'] })}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>
      
      {profiles.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay usuarios registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de registro</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-auxilio-azul rounded-full flex items-center justify-center text-white">
                        {profile.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                        <p className="text-xs text-gray-500">{profile.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {profile.role === 'admin' ? (
                        <Shield className="h-4 w-4 text-auxilio-azul mr-1" />
                      ) : (
                        <User className="h-4 w-4 text-gray-500 mr-1" />
                      )}
                      <span className={`text-sm ${profile.role === 'admin' ? 'text-auxilio-azul font-medium' : 'text-gray-500'}`}>
                        {profile.role === 'admin' ? 'Administrador' : 'Usuario'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.is_approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile.is_approved ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {!profile.is_approved && (
                        <>
                          <button
                            onClick={() => handleApproveUser(profile.id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                            title="Aprobar usuario"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Aprobar
                          </button>
                          <button
                            onClick={() => handleRejectUser(profile.id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Rechazar usuario"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Rechazar
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleToggleAdmin(profile.id, profile.role)}
                        className="text-auxilio-azul hover:underline flex items-center"
                        title={profile.role === 'admin' ? 'Quitar rol de administrador' : 'Hacer administrador'}
                      >
                        {profile.role === 'admin' ? (
                          <>
                            <User className="h-4 w-4 mr-1" />
                            Hacer usuario
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-1" />
                            Hacer admin
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
