var index  = require ('./index');
const ChooseCharacterIntent = require ('./tests/ChooseCharacterIntent');

var event = ChooseCharacterIntent (); 

var context = {
  fail: function (e) { console.error (e); },
  succeed: function (data) { console.log (JSON.stringify (data, 3)); }
};

index.handler (event, context);
