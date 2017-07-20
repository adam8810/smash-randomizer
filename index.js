'use strict';

const Alexa = require ('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const characters = [
    'Mario',
    'Luigi',
    'Captain',
    //'Peach',
    'Jigglypuff',
    'Pikachu',
    'Marth',
    'Ike',
    'Link',
    'Zelda',
    'Bowser Junior',
    'Pac-Man',
    'Corrin',
    'Zero Suit',
    'Samus',
    'Mega Man',
    'King Dee Dee Dee',
    'Wario',
    'Rob',
    'Lucina',
    'Cloud',
    'Robin',
    'Shulk',
    'Villager',
    'Fox',
    'Pit',
    'Bowser',
    'Ness',
    'Lucas',
    'Diddy',
    'Donkey Kong',
    'Ganon',
    'Yoshi',
    'Sheik',
    'Toon Link'
    ];

const handlers = {
    'LaunchRequest': function () {
        this.emit('ChooseCharacterIntent');
    },
    'ChooseCharacterIntent': function () {
        const rand = Math.floor (Math.random () * characters.length);
        this.emit (':tell', 'You\'re playing as ' + characters[rand]);
    },
    'ChooseCharacterNumberIntent': function () {
        const count = this.event.request.intent.slots.Count.value;
        var chosen = [];
        
        if (count <= 0 || count > 8) {
            this.emit (':tell', 'Negative Ghost Rider');
        }
        
        for (var i = 0; i < count; i++) {
            const rand = Math.floor (Math.random () * characters.length);
            chosen.push (characters[rand]);
        }
        
        this.emit (':tell', 'You\'re playing as ' + chosen.slice(0, -1).join (', ') + ' and ' + chosen[chosen.length-1]);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'You can tell me to choose 1 or more characters.');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Good-bye');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Stopping');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

