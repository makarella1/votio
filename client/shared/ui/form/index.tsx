interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
  children: React.ReactNode;
}

export const Form = ({ children, ...props }: FormProps) => (
  <form
    className="flex flex-col gap-10 text-center text-lg font-bold"
    {...props}
  >
    {children}
  </form>
);
