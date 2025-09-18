import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();

    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchMessages)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = async (content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({ content });

    return { data, error };
  };

  return { messages, loading, sendMessage };
};