# 🎵 Podcaster
 Miniaplicación desarrollada con React/Vite para escuchar podcasts de música.


&nbsp;



## Pre Installation
Make sure you have the latest version of Node installed on your machine.
```
Node >= 18.0.0
```

&nbsp;


## Installation
To install the app, first clone this repository:

```
git clone https://github.com/mathvaillant/podcaster.git
```

Then, navigate to the project directory and install the dependencies:
```
cd podcaster
npm install
```

&nbsp;


## Usage
```
yarn dev 
```
This will start the Vite development server at http://localhost:3000.


&nbsp;


## Testing with Cypress
```
yarn test:cy
```
This will run all of the Cypress tests and show logs in the terminal.
```
yarn open:cy 
```
This will open the Cypress desktop app to manually run the tests and see the UI changes.


&nbsp;


## Testing with Vitest
```
yarn vitest 
```
This will run all of the Vitest tests and show logs in the terminal.

&nbsp;

## Testing with Cypress & Vitest
```
yarn test
```
This will run all of the Vitest tests along with the Cypress tests and show logs in the terminal.

&nbsp;



## Build
```
yarn build
```
This will create a production-ready build of the app in the dist directory.

&nbsp;



## Preview 
```
yarn preview
```
This will start the Vite preview Production server at http://localhost:8080.


&nbsp;



## 🤖 Folder automation 
```
bash auto.sh
```
Make sure you're using the Bash terminal.

Will print to the terminal: 
``💪 Let's create some stuff
What would you like to create? Type page/component/service:``

After choosing one, let's say ``"service"``, the terminal will prompt:
``Okay, let's create a service. How would you like to call the service ?``

After choosing a name, hit enter and check out the data created. If you chose a page or component, a folder with a basic structure will be created, in case of a service, will be simply the file.
