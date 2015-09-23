var expect = require('expect.js');
var index = require('../index');

describe('index', function(){
  it('add works',function(){
    expect(index.add(2,1)).to.be(3);
  });
});
