interface ColorizedTextProps {
  text: string;
}

export const ColorizedText = ({ text }: ColorizedTextProps) => {
  const colorized = text.split("").map((char, index) =>
    char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57 ? (
      <span className="text-primary" key={index}>
        {char}
      </span>
    ) : (
      <span className="text-secondary" key={index}>
        {char}
      </span>
    ),
  );

  return <p className="text-xl font-black">{colorized}</p>;
};
