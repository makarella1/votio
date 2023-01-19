import React from 'react';

export const Container = ({ children }: React.PropsWithChildren) => (
  <main className="container mx-auto">{children}</main>
);
