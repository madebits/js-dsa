////////////////////////////////////////////////////////////////////////////////
// tests

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
// toc

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

const firstLine = file => {
  const line = fs.readFileSync(file, 'utf-8').split('\n', 1)
  return line && line.length ? line[0] : null
}

const toc = () => {
  const dir = path.resolve(__dirname)
  const src = path.resolve(path.join(__dirname, './src'))
  const files = walkSync(src).sort().map(_ => {
    const isSpec =  _.endsWith('.spec.js')
    const fileLink = _.substr(dir.length).replace(/\\/g, '/')
    const line = isSpec ? null : firstLine(_)
    const infoUrl = line && line.startsWith('// http') ? line.substr(3) : null
    return {
      isSpec,
      name: path.basename(_),
      link: fileLink,
      folderPath: path.dirname(fileLink) + '/',
      folderName: path.dirname(_.substr(src.length + 1).replace(/\\/g, '/')),
      infoUrl
    }
  })
  let text = `Data Structures and Algorithms in JavaScript${os.EOL}=======${os.EOL}${os.EOL}`
  let previousDir
  files.forEach(_ =>{
    if(previousDir !== _.folderPath) {
      text += `* [${_.folderName}](${_.folderPath})${os.EOL}`
      previousDir = _.folderPath
    }
    const info = _.infoUrl ? `[(?)](${_.infoUrl})` : ''
    text += `\t* [${_.name}](${_.link}) ${_.isSpec ? ' &#10004;' : '' } ${info}${os.EOL}`
  })
  fs.writeFileSync(path.join(__dirname, 'README.md'), text)
}

toc()

////////////////////////////////////////////////////////////////////////////////
