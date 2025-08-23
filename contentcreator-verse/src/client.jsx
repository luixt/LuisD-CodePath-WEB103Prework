
import { createClient } from '@supabase/supabase-js';

const URL = 'https://rszrsjugugarsqbvkcqp.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzenJzanVndWdhcnNxYnZrY3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NjUyNDEsImV4cCI6MjA3MTU0MTI0MX0.-cf8nzx8DX2E2IG_MHSOnqgHtB3nZdiifNU9QaYbOOk';
export const supabase = createClient(URL, API_KEY);
