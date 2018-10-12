const skill = require ('../index');
const handler = skill.handler;
const ChooseCharacterNumberIntent = require ('./ChooseCharacterNumberIntent'); 
const ChooseCharacterIntent = require ('./ChooseCharacterIntent'); 

const callback = {
  fail: jest.fn (),
  succeed: jest.fn ()
};


describe ('Smasher', () => {
  beforeEach (function () {
    callback.fail.mockReset ();
    callback.succeed.mockReset ();
  });

  describe ('ChooseCharacterIntent', () => {

    it ('should return a single character', () => {

      handler (ChooseCharacterIntent (), callback);
      expect (callback.succeed.mock.calls[0][0].response.outputSpeech.ssml).toEqual (expect.stringMatching (/<speak>\sYou're playing as (.*)<\/speak>/g));
    });
  });

  describe ('ChooseCharacterNumberIntent', () => {
    it ('should respond with the correct grammar for two characters', () => {
      handler (ChooseCharacterNumberIntent (2), callback);
      console.log(callback.succeed.mock.calls[0][0].response.outputSpeech.ssml);
      expect (callback.succeed.mock.calls[0][0].response.outputSpeech.ssml).toEqual (expect.stringMatching (/<speak>\sYou're playing as (.*) and (.*)<\/speak>/g));
    });

    it ('should respond with the correct grammar for three characters', () => {
      handler (ChooseCharacterNumberIntent (3), callback);
      console.log(callback.succeed.mock.calls[0][0].response.outputSpeech.ssml);
      expect (callback.succeed.mock.calls[0][0].response.outputSpeech.ssml).toEqual (expect.stringMatching (/<speak>\sYou're playing as {.*}. {.*} and {.*}<\/speak>/g));
    });
  });
});
