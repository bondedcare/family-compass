import { useState } from 'react';
import { useCaregiverPreferences } from '@/contexts/CaregiverPreferencesContext';
import { CAREGIVER_TYPE_CONFIGS, CaregiverType } from '@/types/caregiver';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ClipboardList, Briefcase, Globe, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const iconMap = {
  'clipboard-list': ClipboardList,
  'briefcase': Briefcase,
  'globe': Globe,
};

export const CaregiverTypeSelector = () => {
  const { caregiverType, setCaregiverType, isLoading } = useCaregiverPreferences();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelect = async (type: CaregiverType | null) => {
    setIsUpdating(true);
    try {
      await setCaregiverType(type);
      if (type) {
        toast.success(`Got it! We'll tailor your experience as a ${CAREGIVER_TYPE_CONFIGS[type].label}.`);
      } else {
        toast.success("Preference cleared. You'll see the full experience.");
      }
    } catch (error) {
      toast.error("Couldn't save your preference. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">Your Caregiving Style</CardTitle>
        <CardDescription className="text-base">
          Telling us how you care helps us show what matters most to you. 
          This is completely optional and you can change it anytime.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {Object.values(CAREGIVER_TYPE_CONFIGS).map((config) => {
            const Icon = iconMap[config.icon as keyof typeof iconMap];
            const isSelected = caregiverType === config.type;

            return (
              <button
                key={config.type}
                onClick={() => handleSelect(config.type)}
                disabled={isUpdating}
                className={cn(
                  "relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all",
                  "hover:border-primary/50 hover:bg-primary/5",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected 
                    ? "border-primary bg-primary/10" 
                    : "border-border bg-card",
                  isUpdating && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{config.label}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {config.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {caregiverType && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSelect(null)}
              disabled={isUpdating}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1.5" />
              Clear preference
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground pt-2">
          This helps us prioritize what you see—it never limits your access to information.
        </p>
      </CardContent>
    </Card>
  );
};
