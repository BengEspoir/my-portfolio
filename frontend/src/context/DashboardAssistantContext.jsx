import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const DashboardAssistantContext = createContext(null);

export function DashboardAssistantProvider({ children }) {
  const [assistantTarget, setAssistantTarget] = useState(null);

  const registerAssistantTarget = useCallback((target) => {
    setAssistantTarget(target);

    return () => {
      setAssistantTarget((currentTarget) => (
        currentTarget?.id === target.id ? null : currentTarget
      ));
    };
  }, []);

  const value = useMemo(() => ({
    assistantTarget,
    registerAssistantTarget
  }), [assistantTarget, registerAssistantTarget]);

  return (
    <DashboardAssistantContext.Provider value={value}>
      {children}
    </DashboardAssistantContext.Provider>
  );
}

export function useDashboardAssistant() {
  const context = useContext(DashboardAssistantContext);

  if (!context) {
    throw new Error('useDashboardAssistant must be used inside DashboardAssistantProvider.');
  }

  return context;
}
