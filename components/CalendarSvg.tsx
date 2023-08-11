import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const CalendarSvg = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill='none'
    {...props}
  >
    <G
      stroke="#130F26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M1.093 8.404h17.824M14.442 12.31h.01M10.005 12.31h.009M5.558 12.31h.01M14.442 16.196h.01M10.005 16.196h.009M5.558 16.196h.01M14.044 1v3.29M5.966 1v3.29" />
      <Path
        fillRule="evenodd"
        d="M14.238 2.58H5.771C2.834 2.58 1 4.214 1 7.221v9.05C1 19.326 2.834 21 5.771 21h8.458C17.175 21 19 19.355 19 16.348V7.222c.01-3.007-1.816-4.643-4.762-4.643Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
)
export default CalendarSvg
