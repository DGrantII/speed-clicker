Speed Clicker
=============

A fast-paced, reflex-testing clicker game built with React and Vite.
Challenge yourself to complete clickable grids as quickly as possible, or test your clicking speed in the CPS (Clicks Per Second) test!
(Disclaimer: The game is still a work-in-progress, I am currently working on improvements such as error boundaries and highscores)

Live Demo
---------
Play it here: https://dgrantii.github.io/speed-clicker/

Features
--------
- Three game difficulties: Easy (3x3), Medium (4x4), Hard (5x5)
- Click the highlighted cell to convert the grid to green as fast as possible
- Miss a target? The game ends!
- CPS Test: See how many times you can click in 5 seconds
- Clean, responsive UI
- Built with React, React Router, and Vite

Getting Started
---------------
1. Clone the repository:
   git clone https://github.com/DGrantII/speed-clicker.git

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open your browser and go to:
   http://localhost:5173

Deployment to GitHub Pages
--------------------------
1. Make sure vite.config.js contains:
   base: '/speed-clicker/',

2. Build and deploy:
   npm run build
   npm run deploy

3. The app will be available at:
   https://dgrantii.github.io/speed-clicker/

Project Structure
-----------------
/src
  /components        Reusable React components (Navigation, Header, etc)
  /pages             Main game pages (Home, Game, Cps, Root)
  /utils             Game logic utilities
  index.css          Global styles
vite.config.js       Vite configuration

How to Play
-----------
1. Choose a difficulty from the navigation.
2. Click “Start” to begin.
3. Click only the highlighted (blue) cell to turn it green.
4. Complete the grid as fast as possible. Missing the target ends the game!
5. Try the CPS Test to measure your clicking speed.

Customization
-------------
- Add more levels or features by editing /src/pages and /src/utils.
- Style the game in /src/index.css and /src/App.css.

Credits
-------
- Developed by DGrantII
- Built with React, React Router, and Vite
- Bootstrap 5 for base styling

License
-------
MIT License

Contributions
-------------
Pull requests and suggestions are welcome!
