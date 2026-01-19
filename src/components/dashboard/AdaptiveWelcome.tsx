import { useCaregiverPreferences } from '@/contexts/CaregiverPreferencesContext';
import { useAdaptiveUI } from '@/hooks/useAdaptiveUI';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface AdaptiveWelcomeProps {
  userName: string;
}

export const AdaptiveWelcome = ({ userName }: AdaptiveWelcomeProps) => {
  const { caregiverType, config } = useCaregiverPreferences();
  const { getSupportiveMessage } = useAdaptiveUI();
  const [showPersonalizationPrompt, setShowPersonalizationPrompt] = useState(true);
  
  const firstName = userName?.split(' ')[0] || 'there';
  const supportiveMessage = getSupportiveMessage('dashboard');

  // Different greetings based on caregiver type
  const getGreeting = () => {
    if (!caregiverType) {
      return "Here's what's happening with your loved ones' care.";
    }
    
    switch (caregiverType) {
      case 'primary_coordinator':
        return "Here's your coordination overview—everything in one place.";
      case 'working_caregiver':
        return "Here's what needs your attention right now.";
      case 'long_distance_caregiver':
        return "Here's the latest on your loved one's care.";
      default:
        return "Here's what's happening with your loved ones' care.";
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Hello, {firstName}
        </h1>
        <p className="text-muted-foreground mt-1">
          {getGreeting()}
        </p>
        {supportiveMessage && (
          <p className="text-sm text-primary/80 mt-2 italic">
            {supportiveMessage}
          </p>
        )}
      </div>

      {/* Personalization prompt for users who haven't set a type */}
      {!caregiverType && showPersonalizationPrompt && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm">
                Make this dashboard work better for you
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tell us how you care, and we'll show what matters most to you.
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 mt-1.5 text-primary"
                asChild
              >
                <a href="/settings">Personalize your experience →</a>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPersonalizationPrompt(false)}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
