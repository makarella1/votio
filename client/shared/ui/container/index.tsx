export const Container = ({ children }: React.PropsWithChildren) => (
  <main className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center">
    {children}
  </main>
);
