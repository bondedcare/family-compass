import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Gift, 
  ShoppingCart, 
  Package, 
  Wifi, 
  Calendar, 
  Clock, 
  User,
  Send,
  Loader2,
  History,
  MessageSquare
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { ServiceRequest } from './ServiceRequestCard';

interface StatusHistoryItem {
  id: string;
  old_status: string | null;
  new_status: string;
  notes: string | null;
  created_at: string;
  changed_by: {
    full_name: string;
  } | null;
}

interface Comment {
  id: string;
  content: string;
  is_internal: boolean;
  created_at: string;
  author: {
    full_name: string;
  } | null;
}

interface ServiceRequestDetailDialogProps {
  request: ServiceRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
}

const SERVICE_TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string }> = {
  'gifts_care_packages': { icon: <Gift className="w-5 h-5" />, label: 'Gifts & Care Packages' },
  'grocery_essentials': { icon: <ShoppingCart className="w-5 h-5" />, label: 'Grocery & Essentials' },
  'errands_pickups': { icon: <Package className="w-5 h-5" />, label: 'Errands & Pickups' },
  'home_tech_setup': { icon: <Wifi className="w-5 h-5" />, label: 'Home Tech Setup' },
};

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  'pending': { label: 'Pending', variant: 'secondary' },
  'confirmed': { label: 'Confirmed', variant: 'default' },
  'in_progress': { label: 'In Progress', variant: 'default' },
  'completed': { label: 'Completed', variant: 'outline' },
  'cancelled': { label: 'Cancelled', variant: 'destructive' },
};

const commentSchema = z.object({
  content: z.string().trim().min(1, 'Please enter a comment').max(1000, 'Comment is too long'),
});

type CommentFormData = z.infer<typeof commentSchema>;

export const ServiceRequestDetailDialog = ({
  request,
  open,
  onOpenChange,
  onUpdate,
}: ServiceRequestDetailDialogProps) => {
  const { user } = useAuth();
  const [statusHistory, setStatusHistory] = useState<StatusHistoryItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' },
  });

  useEffect(() => {
    if (open && request && user) {
      fetchDetails();
      fetchProfileId();
    }
  }, [open, request, user]);

  const fetchProfileId = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
    if (data) setProfileId(data.id);
  };

  const fetchDetails = async () => {
    if (!request) return;
    setLoading(true);
    try {
      // Fetch status history
      const { data: historyData } = await supabase
        .from('service_request_status_history' as any)
        .select(`
          id,
          old_status,
          new_status,
          notes,
          created_at,
          changed_by:profiles!service_request_status_history_changed_by_profile_id_fkey (
            full_name
          )
        `)
        .eq('service_request_id', request.id)
        .order('created_at', { ascending: false });

      setStatusHistory((historyData as any) || []);

      // Fetch comments
      const { data: commentsData } = await supabase
        .from('service_request_comments' as any)
        .select(`
          id,
          content,
          is_internal,
          created_at,
          author:profiles!service_request_comments_author_profile_id_fkey (
            full_name
          )
        `)
        .eq('service_request_id', request.id)
        .order('created_at', { ascending: true });

      setComments((commentsData as any) || []);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitComment = async (data: CommentFormData) => {
    if (!request || !profileId) return;

    setSubmittingComment(true);
    try {
      const { error } = await supabase
        .from('service_request_comments' as any)
        .insert({
          service_request_id: request.id,
          author_profile_id: profileId,
          content: data.content,
          is_internal: false,
        });

      if (error) throw error;

      toast.success('Comment added');
      form.reset();
      fetchDetails();
      onUpdate?.();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (!request) return null;

  const typeConfig = SERVICE_TYPE_CONFIG[request.service_type] || { icon: <Package className="w-5 h-5" />, label: 'Service' };
  const statusConfig = STATUS_CONFIG[request.status] || STATUS_CONFIG['pending'];
  const seniorName = request.senior?.profiles?.full_name || 'Unknown';
  const assignedName = request.assigned_to_profile?.full_name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="text-primary">{typeConfig.icon}</div>
            </div>
            <div className="flex-1">
              <DialogTitle className="font-display text-lg">{request.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{typeConfig.label}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
          <span className="text-sm text-muted-foreground">For {seniorName}</span>
        </div>

        <Tabs defaultValue="details" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {comments.length > 0 && <span>({comments.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="w-3 h-3" />
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="details" className="m-0 space-y-4">
              {/* Request Details */}
              {request.description && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {request.preferred_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{format(new Date(request.preferred_date), 'MMMM d, yyyy')}</span>
                  </div>
                )}
                {request.preferred_time_slot && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="capitalize">{request.preferred_time_slot.replace('_', ' ')}</span>
                  </div>
                )}
              </div>

              {assignedName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Assigned to: <strong>{assignedName}</strong></span>
                </div>
              )}

              <Separator />

              <div className="text-xs text-muted-foreground">
                Requested on {format(new Date(request.created_at), 'MMMM d, yyyy at h:mm a')}
              </div>
            </TabsContent>

            <TabsContent value="comments" className="m-0 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No comments yet. Add one below.
                </p>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {comment.author?.full_name || 'Unknown'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.created_at), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitComment)} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea
                            placeholder="Add a comment..."
                            className="resize-none min-h-[60px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="shrink-0 self-end"
                    disabled={submittingComment}
                  >
                    {submittingComment ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="history" className="m-0">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              ) : statusHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No status changes recorded yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {statusHistory.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">
                            {item.old_status ? (
                              <>
                                <span className="capitalize">{item.old_status.replace('_', ' ')}</span>
                                {' → '}
                              </>
                            ) : null}
                            <span className="capitalize">{item.new_status.replace('_', ' ')}</span>
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-sm text-muted-foreground mt-0.5">{item.notes}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.changed_by?.full_name || 'System'} • {format(new Date(item.created_at), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
