var moveZeros = function (arr) {
  var array = arr
  var newArray = [];
  for (var i=0; i<array.length; i++) {

    if(array[i] === 0) {
    	   array.splice(i, 1);
    	   i = i-1;
    	   newArray.push(0)
    }

  }
  console.log(newArray)
  var javier = array.concat(newArray);
  console.log(newArray + 'hhey');
  return javier
}

var newone = moveZeros([1,2,0,0,0,3,0,1,3,4,'false',14,4]);


