import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownloadSvg = (props: any) => (
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
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.021 2.19v12.042M9.106 5.119l2.915-2.928 2.916 2.928"
    />
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7.5 9H7a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-.5"
    />
  </Svg>
)
export default DownloadSvg
