import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);

  const createCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { priceId }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCheckout, loading };
};