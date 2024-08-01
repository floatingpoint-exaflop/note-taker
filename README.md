# Module 10 Challenge: Node.js and Jest - Dynamic SVG Logo Maker

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Credits](#credits)
  - [Questions](#questions)

  ## Description
  This Homework assignment was completed for Unit Ten of the U of M Bootcamp, to practice making a command-line application using Node.js packages and writing svg files with data exports collected from inquirer prompts and class constructors. The complete set of responses is gathered to generate a basic svg logo displaying a graphical polygon (circle, square, or triangle) with text over it; the user determines the shape, shape color, text, and text color. I learned a lot about reorganizing complex template literals as methods in constructor classes, and about how svg files and their syntax can be leveraged to produce shapes on the fly - it would be very easy to add more questions and allow the user to customize basically every aspect of a given shape with inquirer prompts!

  ## Installation
  To install this project after copying down the repo, you will first need to run npm init (-y for default settings) on the project root, which should grant you access to inquirer 8.2.4 and Jest; Use of other/newer versions of inquirer are not recommended for this project unless I can figure out how to update the inquirer syntax in the actual js code.

  ## Usage
  To use this project, ensure you have the node packages installed as specified in the Installation section above. Then open a terminal on the project root and simply run node index.js - from there, just answer the questions!

  [A video tutorial for using svg-logo-maker](https://drive.google.com/file/d/14EdIQuUuhoaR1vc-B7bJ1-Dc5kDgodIq/view?usp=sharing)

  ## Contributing
  If you want to contribute to this project - particularly if you know how I might refactor the code so it works with later versions of inquirer, see my contact info in the Questions section below. I am also curious about ways we might allow the user to give information that we could apply within bounds to ensure we are giving greater design flexibility without allowing generation of useless or broken shapes. Don’t hesitate to reach out! I am a beginner at this stuff but always hungry to learn from others in the community.

  ## Tests
  There is currently one testing suite to cover all three shapes (which have their own sub-suites).

  TRIANGLES Class Constructor
  - it should render a white triangle with the black text "one" when the user picks Triangle and specifies that information.
  - it should render a green triangle with the purple text "TWO" when the user picks Triangle and specifies that information.
  - it should render a yellow triangle with the red text "tre" when the user picks Triangle and specifies that information.
   
  CIRCLES Class Constructor
  - it should render an orange circle with the black text "txt" when the user picks Circle and specifies that information. 
  - it should render a "chocolate" circle with the crimson text "TiM" when the user picks Circle and specifies that information.
  - it should render a cyan circle with the "darkslategrey" text "MAC" when the user picks Circle and specifies that information.
  
  
  SQUARES Class Constructor
  - it should render a fuschia square with the green text "svg" when the user picks Square and specifies that information.
  - it should render a "bisque" square with the blue text "SVG" when the user picks Square and specifies that information.
  - it should render a peach square with the light blue text "svG" when the user picks Square and specifies that information.
  
  ## Credits
  I wanted color validation to actually prevent users from giving bunk color answers, and two souces helped me achieve that goal while adhering to the project requirements for color entry/rendering.

  - Shoutout to [htmlcolorcodes.com](https://htmlcolorcodes.com/color-names/) for helping me get a list of acceptable color names.
  - A huge thanks to [Royi Namir's explanation](https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation) of the regular expression needed to validate/character match the valid syntax for hex codes.
    
  ## Questions
  - [Check me out on Github!](https://www.github.com/floatingpoint-exaflop)
  - [Email Me](mailto:timscallon1@gmail.com?subject=Hello!)

  ## License
  [![Image showing badge for MIT License.](https://img.shields.io/badge/License-MIT_License-blue)](https://mit-license.org/)
  
  This project is using the MIT License. Please click the badge icon for more information, or refer directly to the LICENSE in the repo.
