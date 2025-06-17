
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Apartment {
  id: string;
  name: string;
  description: string | null;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[] | null;
  images: string[] | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const useApartments = () => {
  return useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      console.log('Fetching apartments from Supabase...');
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching apartments:', error);
        throw error;
      }

      console.log('Fetched apartments:', data);
      return data as Apartment[];
    },
  });
};
