Organisation du projet : 

/mon-projet

│── /builders
│   ├── BuildConnections.js
│   ├── BuildUsedDataStatsChart.js
│── /controllers
│   ├── dataController.js
│   ├── controllerConnections.js
│   ├── controllerInOutputOctetsController.js
│   ├── controllerInputOctets.js
│   ├── controllerOutputOctets.js 
│── /routes
│   ├── dataRoutes.js
│── /screen
│   ├── screenScript.js
│── /scripts          <-- (Directory Charts scripts)
│   ├── script_AccessPerSession.js 
│   ├── script_ConnectTimeEvo.js
│   ├── script_radar.md
│   ├── script_UsedData.js
│── /services          <-- (Directory functions query (SQL) from ../index.js)
│   ├── clickhouseService.js
│   ├── inputData.js
│   ├── inputOutputData.js
│   ├── outputData.js
│── /screen          <-- (Directory screen scripts)
│   ├── screenScript.js
│── HomePage.html
│── HomePage.css
│── index.js           <-- (Server's main file)
│── package.json
│── .env
|── .gitignore
|── README.md
