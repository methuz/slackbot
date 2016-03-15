'use strict';
var SlackNode = require('slack-node');

//extend from slack-node
function Slack(botName, botChannel, webhook) {
    var name = botName || 'bot';
    var channel = botChannel || 'dr';
    var attr = new SlackNode();
    for (var key in attr) {
        this[key] = attr[key];
    }
    if (typeof webhook === 'string') {
        this.setWebhook(webhook);
    }
    this.setName = function(newName) {
        name = newName;
    };
    this.getName = function() {
        return name;
    };
    this.setChannel = function(newChannel) {
        channel = newChannel;
    };
    this.getChannel = function() {
        return channel;
    };
    this.sendMessage = function(text, callback) {
        if (typeof callback !== 'function') callback = function() {};
        this.webhook({
            'channel': channel,
            'username': name,
            'text': text
        }, callback);
    };

    this.sendCustomMessage = function(object, callback) {
        if (typeof callback === 'function') {
            this.webhook(object, callback);
        } else {
            this.webhook(object);
        }
    };
}

module.exports = Slack;
