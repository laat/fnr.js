var fnrUtils = require("../fnr-util"),
    data = require("./test-data"),
    chai = require("chai"),
    assert = chai.assert;


function generate(dato) {
    var gen = fnrUtils.generator(dato); 
    var fnrs = []; 
    var har = true; 
    while(har){
        var f = gen.next(); 
        har=!f.done; 
        fnrs.push(f.value);
    }
    return fnrs;
}

function test(dato, testData) {
    assert.sameMembers(testData,
        generate(dato),
        'bare riktige på dato');
    testData.forEach(function(d){
        assert.isTrue(fnrUtils.valider(d), 'skal være gyldig');
    });
}

test(new Date("2015-03-24"), data.mulige_24_03_2015);
console.log("test complete");
