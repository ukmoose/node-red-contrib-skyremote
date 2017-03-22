# node-red-contrib-skyremote
A [Node-RED](http://nodered.org) node to remotely control a Sky satellite box. The node mimics the functionality of a Sky Remote

## Install

Easiest
Use the Manage Palette > Install option from the menu inside node-red

Harder
Use npm to command to install this package locally in the Node-RED modules directory
```bash
npm install node-red-contrib-skyremote
```

## Usage
A node to remotely control a Sky satellite box. The node mimics the Sky Box functionality of the Sky Remote. Primarily it was written to allow other nodes such as homekit, alexa and dashboard to control the status of the Sky Box

Works with Sky+HD and SkyQ. 
     The node can accept the commands listed below: 
```power``` ```sky```
```tvguide``` or ```home``` ```boxoffice``` ```services``` or ```search``` ```interactive``` or ```sidebar```
```up``` ```down``` ```left``` ```right``` ```select```
```channelup``` ```channeldown``` ```i```
```backup``` or ```dismiss``` ```text``` ```help```
```play``` ```pause``` ```rewind``` ```fastforward``` ```stop``` ```record```
```red``` ```green``` ```yellow``` ```blue```
```1``` ```2``` ```3``` ```4``` ```5``` ```6``` ```7``` ```8``` ```9``` ```0```

 A command can be sent as a string in msg.payload (```msg.payload="play"```) 
 A chain of commands can be sent as an array of strings in msg.payload (```msg.payload = ["1","0","6","select"]``` for example to change to channel 106)

 The node cannot change volume as that is done from the handest direct to the TV and not via the Sky Box


## Tested devices

Tested with a UK Sky+HD box, the underlying npm library supports the SkyQ box but I haven't got one to test.

Tried on another device??? Let me know ;)

## History


- 0.0.3 - March 2017 : Initial Release
- 0.0.2 - March 2017 : Typos
- 0.0.1 - March 2017 : Initial Release

## Authors
* Mark Setrem (https://github.com/ukmoose)

## Credits

This node is a wrapper around the npm  [sky-remote](https://www.npmjs.com/package/sky-remote) library written by [Dal Hundal](https://github.com/dalhundal) 

Node-RED has been made possible by the hard work of Nick O'Leary @knolleary and Dave Conway-Jones @ceejay at IBM Emerging Technology. Much thanks to them and other supporters for advancing this platform.

## License
This project is licensed under the terms of the MIT license.