# HotMap
KAIST Fall 2023, CS473 Project

### How to run
```bash
npm install
npm run start
```

### Project structure
```bash
public                  # image files for stamps in whiteboard and index.html 
└─index.html            # Getting Naver map API and fontawesome
src
├─community             # Codes for comment
├─db                    # Codes for firebase
├─whiteboard            # Codes for whiteboard
├─AddPlace.js           # Function for adding new markers
├─Main.js               # Root function
├─Map.js                # Component getting Naver map and showing heat map and markers.
├─Sidebar.js            # Function called when marker clicked. It include comment and whiteboard
└─UserWriter.js         # Function used by users to write comments.
```
