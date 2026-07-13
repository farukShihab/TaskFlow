import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col gap-6 p-8">
      {children}
    </div>
  );
}