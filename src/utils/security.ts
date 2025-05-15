import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
  role: 'admin' | 'developer' | 'user';
  permissions: string[];
}

export const checkUserRole = async (): Promise<UserRole> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { role: 'user', permissions: ['read'] };
    }

    // In a real app, you'd fetch this from Supabase
    const mockRoles: Record<string, UserRole> = {
      admin: {
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'execute']
      },
      developer: {
        role: 'developer',
        permissions: ['read', 'write', 'execute']
      },
      user: {
        role: 'user',
        permissions: ['read']
      }
    };

    return mockRoles[session.user.role as keyof typeof mockRoles] || mockRoles.user;
  } catch (error) {
    console.error('Error checking user role:', error);
    return { role: 'user', permissions: ['read'] };
  }
};

export const hasPermission = async (permission: string): Promise<boolean> => {
  const userRole = await checkUserRole();
  return userRole.permissions.includes(permission);
};