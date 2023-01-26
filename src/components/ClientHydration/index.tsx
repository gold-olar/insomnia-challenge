import React, { useState, useEffect } from "react";

export default function ClientHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const [componentHasMounted, setComponentHasMounted] = useState(false);

  useEffect(() => {
    setComponentHasMounted(true);
  }, []);

  if (!componentHasMounted) return null;

  return <>{children}</>;
}
