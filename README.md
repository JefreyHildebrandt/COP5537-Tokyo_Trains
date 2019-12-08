# Tokyo Trains
## COP5537 - Final Project 
## Jeff Hildebrandt - j1823025

**Running the Code:**
* locally dev
```$xslt
npm install
npm run dev 
go to localhost:8080
```
  
* production
```$xslt
npm run build
node server.js
go to localhost:5000
```

* overall process
```
- Parse all nodes and edges from trains data
- save all nodes to a map
- group nodes that are at the same station
- connect the edges to the station instead of the nodes and calculate distance between edges
- nodes are separated by company
- find most connected node "新宿" - Shinjuku with 23 connections
- remove stations that can't connect to Shinjuku
- have to scale stations since the XY coordinates were huge
- 
```

*********************************************************************************************************
