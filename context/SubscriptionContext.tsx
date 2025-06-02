import React, { createContext, useContext, useState } from 'react';

type Plan = {
  id: string;
  title: string;
  price: string;
  videos: number;
};

type SubscriptionContextType = {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <SubscriptionContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}