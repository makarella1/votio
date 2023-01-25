interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export const Input = ({ id, label, ...props }: InputProps) => (
  <div>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      className="rouned-xl w-full rounded-xl border-2 border-black py-2 text-center font-normal"
      id={id}
      {...props}
    />
  </div>
);
