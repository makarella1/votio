export const Container = ({ children }: React.PropsWithChildren) => (
  <main className="container mx-auto flex h-screen flex-col items-center justify-center">
    {children}
  </main>
);
