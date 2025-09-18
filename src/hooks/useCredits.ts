import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCredits = () => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setCredits(data.credits);
      }
      setLoading(false);
    };

    fetchCredits();
  }, []);

  const addCredits = async (amount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_credits')
      .upsert({ 
        user_id: user.id, 
        credits: credits + amount 
      }, { 
        onConflict: 'user_id' 
      });

    if (!error) {
      setCredits(credits + amount);
    }
    return { data, error };
  };

  return { credits, loading, addCredits };
};