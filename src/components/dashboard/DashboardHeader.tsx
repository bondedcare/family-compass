import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCaregiverPreferences } from '@/contexts/CaregiverPreferencesContext';
import { CAREGIVER_TYPE_CONFIGS } from '@/types/caregiver';
import { Heart, LogOut, User, Settings, ClipboardList, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  userName: string;
}

const caregiverTypeIcons = {
  primary_coordinator: ClipboardList,
  working_caregiver: Briefcase,
  long_distance_caregiver: Globe,
};

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  const { caregiverType, config } = useCaregiverPreferences();
  
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const CaregiverIcon = caregiverType ? caregiverTypeIcons[caregiverType] : null;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-display font-semibold text-foreground">Bonded Care</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Caregiver type indicator */}
          {config && CaregiverIcon && (
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5 font-normal">
              <CaregiverIcon className="h-3.5 w-3.5" />
              <span>{config.label}</span>
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {config ? config.label : 'Family Member'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
