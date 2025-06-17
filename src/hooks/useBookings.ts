
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Booking {
  id: string;
  user_id: string;
  apartment_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  apartment_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  special_requests?: string;
}

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      console.log('Fetching user bookings...');
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      console.log('Fetched bookings:', data);
      return data as Booking[];
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      console.log('Creating booking:', bookingData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User must be authenticated to create a booking');
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            ...bookingData,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating booking:', error);
        throw error;
      }

      console.log('Created booking:', data);
      return data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
