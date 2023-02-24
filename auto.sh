#!/usr/bin/env sh

# Functions
function createPage() {
  echo "Creating page $1..."

  # Mock content
  EMPTY_LINE=""
  
  LINE_COMP_1="import React from 'react'"
  LINE_COMP_2="// Styles"
  LINE_COMP_3='import useStyles from "./styles";'
  LINE_COMP_4="export default function $1() {"
  LINE_COMP_5="const { classes } = useStyles();"
  LINE_COMP_6="return <div className={classes.root}>$1</div>"
  LINE_COMP_7="}"

  LINE_STYLES_1='import { makeStyles } from "tss-react/mui";'
  LINE_STYLES_2="export default makeStyles()(() => ({"
  LINE_STYLES_3="root: {}"
  LINE_STYLES_4="}));"

  # Go into Pages
  cd "./src/Pages"

  # Create a folder for the new Page
  mkdir "$1"

  # Go into the new Page
  cd "$1"

  # Create the Page component
  NEW_PAGE="$1.tsx"
  touch "$NEW_PAGE"

  # Write basic structure for the Page
  echo $LINE_COMP_1 >> "$NEW_PAGE"
  echo $EMPTY_LINE >> "$NEW_PAGE"
  echo $LINE_COMP_2 >> "$NEW_PAGE"
  echo $LINE_COMP_3 >> "$NEW_PAGE"
  echo $EMPTY_LINE >> "$NEW_PAGE"
  echo $LINE_COMP_4 >> "$NEW_PAGE"
  echo $LINE_COMP_5 >> "$NEW_PAGE"
  echo $EMPTY_LINE >> "$NEW_PAGE"
  echo $LINE_COMP_6 >> "$NEW_PAGE"
  echo $LINE_COMP_7 >> "$NEW_PAGE"
  echo "✅ Created "$NEW_PAGE""

  # Create the styles file
  NEW_STYLES="styles.ts"
  touch "$NEW_STYLES"

  # Write basic styles
  echo $LINE_STYLES_1 >> "$NEW_STYLES"
  echo $EMPTY_LINE >> "$NEW_PAGE"
  echo $LINE_STYLES_2 >> "$NEW_STYLES"
  echo $LINE_STYLES_3 >> "$NEW_STYLES"
  echo $LINE_STYLES_4 >> "$NEW_STYLES"
  echo "✅ Created $NEW_STYLES"
}

function createComponent() {
  echo "Creating component $1..."

  # Mock content
  EMPTY_LINE=""
  
  LINE_COMP_1="import React from 'react'"
  LINE_COMP_2="// Styles"
  LINE_COMP_3='import useStyles from "./styles";'
  LINE_COMP_4="export default function $1() {"
  LINE_COMP_5="const { classes } = useStyles();"
  LINE_COMP_6="return <div className={classes.root}>$1</div>"
  LINE_COMP_7="}"

  LINE_STYLES_1='import { makeStyles } from "tss-react/mui";'
  LINE_STYLES_2="export default makeStyles()(() => ({"
  LINE_STYLES_3="root: {}"
  LINE_STYLES_4="}));"

  # Go into the components
  cd "./src/Components"

  # Create the folder 
  mkdir "$1"

  # Go into the folder
  cd "$1"

  # Create the component file
  NEW_COMPONENT="$1.tsx"
  touch "$NEW_COMPONENT"

   # Write basic structure for the Page
  echo $LINE_COMP_1 >> "$NEW_COMPONENT"
  echo $EMPTY_LINE >> "$NEW_COMPONENT"
  echo $LINE_COMP_2 >> "$NEW_COMPONENT"
  echo $LINE_COMP_3 >> "$NEW_COMPONENT"
  echo $EMPTY_LINE >> "$NEW_COMPONENT"
  echo $LINE_COMP_4 >> "$NEW_COMPONENT"
  echo $LINE_COMP_5 >> "$NEW_COMPONENT"
  echo $EMPTY_LINE >> "$NEW_COMPONENT"
  echo $LINE_COMP_6 >> "$NEW_COMPONENT"
  echo $LINE_COMP_7 >> "$NEW_COMPONENT"
  echo "✅ Created "$NEW_COMPONENT""

  # Create the styles file
  NEW_STYLES="styles.ts"
  touch "$NEW_STYLES"

  # Write basic styles
  echo $LINE_STYLES_1 >> "$NEW_STYLES"
  echo $EMPTY_LINE >> "$NEW_PAGE"
  echo $LINE_STYLES_2 >> "$NEW_STYLES"
  echo $LINE_STYLES_3 >> "$NEW_STYLES"
  echo $LINE_STYLES_4 >> "$NEW_STYLES"
  echo "✅ Created $NEW_STYLES"
}

function createService() {
  echo "Creating service $1..."

  # Go into the services
  cd "./src/Services"

  # Create the service file
  touch "$1Service.ts"

  echo "✅ Created $1 service"
}

# Ask for type of file to create
echo "💪 Let's create some stuff"
read -p "What would you like to create? Type page/component/service: " DATA_TYPE

# Check for invalid data type
if [ "$DATA_TYPE" = "page" ] || [ "$DATA_TYPE" = "component" ] || [ "$DATA_TYPE" = "service" ];
then 
  read -p "Okay, let's create a $DATA_TYPE. How would you like to call the $DATA_TYPE ? " NEW_ITEM

  # Trim white spaces
  ITEM=${NEW_ITEM#"${NEW_ITEM%%[![:space:]]*}"}
  ITEM=${ITEM%"${ITEM##*[![:space:]]}"}

  # Check for data type to be created
  case "$DATA_TYPE" in
    page)
      createPage $ITEM 
      ;;
    component)
      createComponent $ITEM 
      ;;
    service)
      createService $ITEM 
      ;;
    *)
    echo "Please, enter a valid data type name!"
    ;;
  esac
else
  echo "Please, enter a valid data type name!"
fi


