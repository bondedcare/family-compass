import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, ClipboardList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceRequestCard, ServiceRequest } from './ServiceRequestCard';
import { ServiceRequestDetailDialog } from './ServiceRequestDetailDialog';

export const ServiceRequestsList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_requests' as any)
        .select(`
          id,
          service_type,
          title,
          description,
          status,
          urgency,
          preferred_date,
          preferred_time_slot,
          created_at,
          completed_at,
          assigned_to_profile:profiles!service_requests_assigned_to_profile_id_fkey (
            full_name
          ),
          senior:seniors (
            profiles (
              full_name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get comment counts for each request
      const requestsWithCounts = await Promise.all(
        ((data as any) || []).map(async (req: any) => {
          const { count } = await supabase
            .from('service_request_comments' as any)
            .select('*', { count: 'exact', head: true })
            .eq('service_request_id', req.id);

          return {
            ...req,
            senior: Array.isArray(req.senior) ? req.senior[0] : req.senior,
            assigned_to_profile: Array.isArray(req.assigned_to_profile) 
              ? req.assigned_to_profile[0] 
              : req.assigned_to_profile,
            comments_count: count || 0,
          };
        })
      );

      setRequests(requestsWithCounts);
    } catch (error) {
      console.error('Error fetching service requests:', error);
      toast.error('Failed to load service requests');
    } finally {
      setLoading(false);
    }
  };

  const activeRequests = requests.filter(r => 
    ['pending', 'confirmed', 'in_progress'].includes(r.status)
  );
  
  const completedRequests = requests.filter(r => 
    ['completed', 'cancelled'].includes(r.status)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground mb-1">No service requests yet</h3>
        <p className="text-sm text-muted-foreground">
          Request a service above and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active" className="flex items-center gap-2">
            Active
            {activeRequests.length > 0 && (
              <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {activeRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {completedRequests.length > 0 && (
              <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded-full ml-1">
                {completedRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="m-0">
          {activeRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No active requests at the moment.
            </p>
          ) : (
            <div className="space-y-3">
              {activeRequests.map((request) => (
                <ServiceRequestCard
                  key={request.id}
                  request={request}
                  onClick={() => setSelectedRequest(request)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          {completedRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No completed requests yet.
            </p>
          ) : (
            <div className="space-y-3">
              {completedRequests.map((request) => (
                <ServiceRequestCard
                  key={request.id}
                  request={request}
                  onClick={() => setSelectedRequest(request)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ServiceRequestDetailDialog
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
        onUpdate={fetchRequests}
      />
    </>
  );
};
