type BrandIconProps = {
  dark?: boolean
} & React.SVGProps<SVGSVGElement>

function BrandIcon({ dark, ...svgProps }: BrandIconProps) {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <g clipPath="url(#clip0_1_2)">
        <rect
          x="12"
          y="12"
          width="488"
          height="488"
          rx="112"
          fill={dark ? "black" : "white"}
          stroke={dark ? "white" : "black"}
          strokeWidth="24"
        />
        <rect y="220" width="179" height="30" rx="8" fill="#FF0000" />
        <rect
          x="489.738"
          y="435.046"
          width="376.13"
          height="30"
          transform="rotate(-150 489.738 435.046)"
          fill="#FF0000"
        />
        <rect x="12" y="12" width="488" height="488" rx="112" stroke={dark ? "white" : "black"} strokeWidth="24" />
        <path
          d="M180 189.5C180 179.559 171.941 171.5 162 171.5C152.059 171.5 144 179.559 144 189.5H180ZM144 189.5V491.5H180V189.5H144Z"
          fill={dark ? "white" : "black"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="512" height="512" fill={dark ? "black" : "white"} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BrandIcon
