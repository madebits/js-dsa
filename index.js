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

////////////////////////////////////////////////////////////////////////////////

const fs = require('fs')
const path = require('path')
const os = require('os')

// https://gist.github.com/kethinov/6658166
const walkSync = (d) =>
  fs.statSync(d).isDirectory()
    ? Array.prototype.concat(...fs.readdirSync(d)
      .map(f => walkSync(path.join(d, f))))
      .filter(_ => _.endsWith('.js'))
    : d

const generate = function () {
  const dir = path.resolve(__dirname)
  const src = path.resolve(path.join(__dirname, './src'))
  const files = walkSync(src)
  let text = `Data Structures and Algorithms in JavaScript${os.EOL}=======${os.EOL}${os.EOL}`
  text += files.map(_ => { 
    return `${_.endsWith('.spec.js') ? '\t*' : '*'} [${_.substr(src.length + 1).replace(/\\/g, '/')}](.${_.substr(dir.length).replace(/\\/g, '/')})`
  }).join(os.EOL)

  fs.writeFileSync(path.join(__dirname, 'README.md'), text)
}

generate()

////////////////////////////////////////////////////////////////////////////////

if(process.env.NODE_ENV === 'development')
  setInterval(() => {}, 1 << 30)

////////////////////////////////////////////////////////////////////////////////