interface MarkerSVGProps {
  border?: {
    color: string;
    width: number;
  };
  fill?: string;
  children?: React.ReactNode;
}

export default function MarkerSVG({ fill, border, children }: MarkerSVGProps) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28" cy="28" r="25.5" stroke="black" stroke-width="5" />
      <circle cx="28" cy="28" r="20" fill="#1CE5BE" />
      <path
        d="M21.2109 37H25.0781V30.5703H31.3828V37H35.2422V21H31.3828V27.4219H25.0781V21H21.2109V37Z"
        fill="black"
      />
    </svg>
  );
}
