import Svg, { Path } from "react-native-svg"
const DropdownSvg = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m7 9 4.293 4.293a1 1 0 0 0 1.414 0L17 9"
    />
  </Svg>
)
export default DropdownSvg
