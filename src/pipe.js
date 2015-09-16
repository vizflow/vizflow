export default function pipe(task) {
  var prom = Promise.resolve() ; // resolved Promise object that is ready to execute a "then" callback
  for(var i = 0 ; i < task.length ; i++) prom = prom.then(task[i]) ; // asynchronously execute a sequence of functions using Promise.then chaining 
  return prom ; // return the promise
}