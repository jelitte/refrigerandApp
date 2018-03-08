var result = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0')

var dec = 123;
var bin = dec.toString(2);
console.log(bin);
console.log(bin[0]);
console.log(bin[1]);
console.log(bin[2]);

console.log(bin.length);

for(var i = bin.length-1; i >= 0; i-- ){
    //result[15-i] = bin[-(i-bin.length + 1)];
    result[15-i] = bin[-(i-bin.length + 1)];
}

/*
for(var i=0; i<bin.length-1;i++){
  resultbin[bin.length - i] = bin[i];
}*/

console.log(result.reverse());
console.log(result[0] == "1");
