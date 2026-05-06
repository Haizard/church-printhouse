'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error) => {
      console.error('Firebase Permission Error:', error);
      toast({
        title: 'Access Denied',
        description: `You do not have permission to ${error.context.operation} at ${error.context.path}.`,
        variant: 'destructive',
      });
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}
