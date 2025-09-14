/** @type {import('tailwindcss').Config} */
import { Colors } from './src/utils/colors'
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        RobotoExtraBold: 'RobotoExtraBold',
        RobotoBold: 'RobotoBold',
        RobotoSemiBold: 'RobotoSemiBold',
        RobotoMidium: 'RobotoMidium',
        Roboto: 'RobotoRegular',
        RobotoThin: 'RobotoThin',
      },
      colors: {
        // Custom colors that adapt to dark mode
        white: Colors.white,
        black: Colors.black,
        primary: {
          light: Colors.white,
          dark: Colors.black,
        },
        secondary: {
          light: Colors.primaryLight,
          dark: Colors.primaryDark,
        },
        tertiary:{
          light: Colors.secondaryLight,
          dark: Colors.secondaryDark,
        },
        success: Colors.success,
        warning: Colors.warning,
        danger: Colors.danger,
        info: Colors.info,
      },
    },
  },
  darkMode: "class",
  plugins: [],
}