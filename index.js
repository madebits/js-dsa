require('require-dir')('src', {
  recurse: true,
  //duplicates: true,
  filter: function (fullPath) {
    return !fullPath.endsWith('.js') || fullPath.endsWith('.spec.js')
  }
})

const test = require('tape')
// const tapSpec = require('tap-spec')
 
// test.createStream()
//   .pipe(tapSpec())
//   .pipe(process.stdout)

test.onFinish(() => {
  const harness = test.getHarness()
  const result = harness._results
  if (result.fail) {
    console.log(`\nFailed: ${result.fail}, Passed: ${result.pass}, Count: ${result.count}`)
    console.log('\n:( ' + '-'.repeat(10))
    console.error(harness._tests.filter(_ => !_._ok).map(_ => _.name).join('\n'))
  } else {
    console.log(`\nPassed: ${result.pass}, Count: ${result.count}`)
    console.log('\n:) ' + '+'.repeat(10) + '\n')
  }
})

if(process.env.NODE_ENV === 'development')
  setInterval(() => {}, 1 << 30)