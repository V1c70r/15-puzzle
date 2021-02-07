describe('KeyboardInput', () => {
  describe('constructor', () => {
    it('sets i18n');
  });

  describe('start', () => {
    it('creates readline interface');
  });

  describe('stop', () => {
    it('closes readline interface');
  });

  describe('getCommand', () => {
    it('returns commands from string input');
  });

  describe('stringToCommand', () => {
    it('returns new command for new string');

    it('returns exit command for exit string');

    it('returns move command for number string');

    it('returns unknown command otherwise');
  });
});
