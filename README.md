Chrome extension with tools for studying
  Flashcards
  Pomodoro Timer
  Summarizer
  Citation Generator
  Quizzes

UW Madison Software Club Team 10
  Jason Carmichael (Lead)
  Davy Fan
  Miguel Lima Pereira 
  Prithwiraj Purkait
  Sharvin Malshe

Command to start node: 24-alpine (copy from file editor not GitHub display)
  docker run -it --rm --name sunny-study-dev `
  -v "${PWD}:/app" `
  -w /app `
  -p 5173:5173 `
  -e CHOKIDAR_USEPOLLING=1 `
  -e CHOKIDAR_INTERVAL=200 `
  node:24-alpine sh

run npm install first time (to get dependencies)
then npm run dev to start dev server
