Organisation du projet : 

/mon-projet
│── /routes
│   ├── dataRoutes.js
│── /controllers
│   ├── dataController.js
│   ├── controllerConnections.js
│   ├── controllerInOutputOctetsController.js
│   ├── controllerInputOctets.js
│   ├── controllerOutputOctets.js 
│── /scripts          <-- (Directory Charts scripts)
│   ├── script_bar.js 
│   ├── script_doughnut.js
│   ├── script_line.js
│   ├── script_radar.js
│── /services          <-- (Directory functions query (SQL) from ../index.js)
│   ├── clickhouseService.js
│   ├── inputData.js
│   ├── inputOutputData.js
│   ├── outputData.js
│── /screen          <-- (Directory screen scripts)
│   ├── screenScript.js
│── index.js           <-- (Server's main file)
│── HomePage.html
│── HomePage.css
│── package.json
│── .env
|── .gitignore
