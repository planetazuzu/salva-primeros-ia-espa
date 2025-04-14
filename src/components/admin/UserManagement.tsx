
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { UserCheck, UserX, Trash2, PenSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

// Define the user profile interface for mock data
interface Profile {
  id: string;
  email: string;
  name: string;
  role: string;
  is_approved: boolean;
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users - using mock data since 'profiles' table doesn't exist
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Instead of querying a non-existent table, we'll use mock data
      // In a real app, you would query an existing table or create the profiles table first
      const mockUsers: Profile[] = [
        {
          id: '1',
          email: 'doctor@example.com',
          name: 'Dr. María Rodríguez',
          role: 'doctor',
          is_approved: true,
          created_at: '2023-02-15T10:30:00Z'
        },
        {
          id: '2',
          email: 'enfermero@example.com',
          name: 'Carlos Jiménez',
          role: 'nurse',
          is_approved: true,
          created_at: '2023-03-10T14:45:00Z'
        },
        {
          id: '3',
          email: 'estudiante@example.com',
          name: 'Ana López',
          role: 'student',
          is_approved: false,
          created_at: '2023-04-05T09:15:00Z'
        },
        {
          id: '4',
          email: 'profesor@example.com',
          name: 'José Martínez',
          role: 'teacher',
          is_approved: true,
          created_at: '2023-01-20T11:00:00Z'
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Approve user functionality (mock implementation)
  const approveUser = async (userId: string) => {
    try {
      // In a real implementation, you would update the user's approval status in the database
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, is_approved: true } : user
        )
      );
      toast.success('Usuario aprobado correctamente');
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Error al aprobar usuario');
    }
  };

  // Reject user functionality (mock implementation)
  const rejectUser = async (userId: string) => {
    try {
      // In a real implementation, you would update the user's approval status in the database
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, is_approved: false } : user
        )
      );
      toast.success('Usuario rechazado correctamente');
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Error al rechazar usuario');
    }
  };

  // Delete user functionality (mock implementation)
  const deleteUser = async (userId: string) => {
    try {
      // In a real implementation, you would delete the user from the database
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error al eliminar usuario');
    }
  };

  // Update user role functionality (mock implementation)
  const updateUserRole = async () => {
    if (!selectedUser || !newRole) return;
    
    try {
      // In a real implementation, you would update the user's role in the database
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
      toast.success('Rol de usuario actualizado correctamente');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error al actualizar rol de usuario');
    }
  };

  const openEditDialog = (user: Profile) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Gestión de Usuarios</h2>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="w-10 h-10 border-4 border-auxilio-azul border-t-transparent rounded-full animate-spin"></div>
        </div>
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
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-700 capitalize">{user.role}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.is_approved ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aprobado</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pendiente</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      {!user.is_approved && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 hover:text-green-800"
                          onClick={() => approveUser(user.id)}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Aprobar
                        </Button>
                      )}
                      {user.is_approved && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-amber-600 hover:text-amber-800"
                          onClick={() => rejectUser(user.id)}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Más <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <PenSquare className="h-4 w-4 mr-2" />
                            Editar rol
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar rol de usuario</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Usuario: <span className="font-medium">{selectedUser?.name}</span>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol actual</label>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  <span className="text-sm capitalize">{selectedUser?.role}</span>
                </div>
              </div>
              <div>
                <label htmlFor="newRole" className="block text-sm font-medium text-gray-700 mb-1">Nuevo rol</label>
                <select
                  id="newRole"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
                >
                  <option value="">Seleccionar rol</option>
                  <option value="admin">Administrador</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Enfermero</option>
                  <option value="student">Estudiante</option>
                  <option value="teacher">Profesor</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={updateUserRole} disabled={!newRole || newRole === selectedUser?.role}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
