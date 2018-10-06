'use strict';
const Alexa = require ('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.925fe2c7-0056-4823-bedf-85cf27c5eed5';

const characters = [
  'Mario',
  'Luigi',
  'Captain Falcon',
  'Peach',
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
  'Toon Link',
  'Reu'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('ChooseCharacterIntent');
    },
    'ChooseCharacterIntent': function () {
      const img = {
        smallImageUrl: 'https://s3.amazonaws.com/ambooth-smasher/mario.png',
        largeImageUrl: 'https://s3.amazonaws.com/ambooth-smasher/mario.png'

      };
      const rand = Math.floor (Math.random () * characters.length);
      const text = 'You\'re playing as ' + characters[rand];

        this.response.speak (text)
        .renderTemplate ({
          type: 'list',
          title: 'Smasher',
          listItems: [
            {
              image: img,
              textContent: 'Mario'
            }
          ]
        });
        this.emit (':responseReady');
    },
    'ChooseCharacterNumberIntent': function () {
        const count = this.event.request.intent.slots.Count.value;
        var chosen = [];
        
        if (count <= 0) {
            return this.emit (':tell', 'That\'s an invalid number.');
        }
        
        for (var i = 0; i < count; i++) {
            const rand = Math.floor (Math.random () * characters.length);
            chosen.push (characters[rand]);
        }
        
        this.emit (':tell', 'You\'re playing as ' + chosen.slice(0, -1).join (', ') + ' and ' + chosen[chosen.length-1]);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Welcome to Smasher! You can tell me to choose 1 or more characters and I\'ll respond accordingly.');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Good-bye');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Stopping');
    }
};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);

  console.log('interfaces', event.context.System.device.supportedInterfaces);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

