/**
 * Copyright 2017 Mark Setrem.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    // require any external libraries we may need....
    var SkyRemote = require('sky-remote');

    var arrayOfCommands = ["power", "select", "backup", "dismiss", "channelup", "channeldown", "interactive", "sidebar", "help", "services",
        "search", "tvguide", "home", "i", "text", "up", "down", "left", "right", "red", "green", "yellow", "blue", "0", "1", "2", "3", "4",
        "5", "6", "7", "8", "9", "play", "pause", "stop", "record", "fastforward", "rewind", "boxoffice", "sky"];

    function SkyRemoteOutNode(n) {
        // Create a RED node
        RED.nodes.createNode(this, n);

        // Retrieve the config node
        this.server = RED.nodes.getNode(n.server);

        if (!this.server) {
            // No config node configured
            this.status({ fill: "yellow", shape: "dot", text: "configuration error" });
            return this;
        }

        var remoteControl = new SkyRemote(this.server.host, this.server.port);

        if (!remoteControl) {
            this.status({ fill: "yellow", shape: "dot", text: "an error occurred" });
            return this;
        }

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        this.on('input', function(msg) {

            //if (payload.hasOwnProperty('mode') || node.hasOwnProperty('mode')) {
            if (msg.hasOwnProperty('payload') || node.hasOwnProperty('payload')) {
                var _mode = msg.payload;
                node.status({ fill: "blue", shape: "dot", text: "Command:" + _mode });


                //if a string and [ XXXX ] - to allow for use direct with a/z in inject node
                if (typeof _mode === 'string' && _mode.startsWith('[') && _mode.endsWith(']')) {
                    _mode = JSON.parse(_mode);
                }

                //convert number into string - in case number passed as number 
                if (typeof _mode === 'number') {
                    _mode = String(_mode);
                }

                //check to see if string is a command
                if (typeof _mode === 'string' && arrayOfCommands.indexOf(_mode) !== -1) {
                    var isarraySubsetOfCommands = true;
                }

                //check to see if all of arrays contents are commands 
                if (Array.isArray(_mode)) {
                    //console.log("its an array");
                    _mode = _mode.map(String)
                    var isarraySubsetOfCommands = _mode.every(function(val) {
                        return arrayOfCommands.indexOf(val) >= 0; });
                    //console.log(isarraySubsetOfCommands); // true
                }
                //console.log(_mode);

                if (isarraySubsetOfCommands === true) {
                    var command = _mode;
                    remoteControl.press(command, function(err) {
                        if (err) {
                            if (err.code === "ECONNREFUSED") {
                                node.status({ fill: "red", shape: "dot", text: "Can't connect to " + err.address });
                                node.error("Can't connect to " + err.address + " code: " + err.code);
                                console.log("SkyREmoteError" + err);
                            } else {
                                node.status({ fill: "red", shape: "dot", text: "Error " + err });
                                node.error(JSON.stringify(err));
                                console.log("SkyREmoteError" + err);
                            }
                        } 
                    });
                } else {
                    node.status({ fill: "red", shape: "dot", text: "Error Unknown Command" });
                }
            }
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
            if (node.interpreter != null) {
                node.interpreter.kill('SIGKILL'); { node.log("end"); }
            }
            if (RED.settings.verbose) { node.log("end"); }
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("Sky Remote", SkyRemoteOutNode);

}
