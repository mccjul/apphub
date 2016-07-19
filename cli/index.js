#!/usr/bin/env node

var execSync = require('child_process').execSync;
var path = require('path');
var uuid = require('node-uuid');
var mkdirp = require('mkdirp');
<<<<<<< HEAD
var BUILD_DIR_SUFFIX = '.bundle';
=======
var BUILD_DIR_NAME = 'ios.bundle';
>>>>>>> AppHubPlatform/master

var argv = require('yargs')
  .usage('apphub <command>')
  .command('build', 'build a zip that can be uploaded to AppHub', function (yargs, argv) {
    argv = yargs
      .option('o', {
        alias: 'output-zip',
        description: 'Output zip relative path',
        required: true,
      })
      .option('entry-file', {
        description: 'Path to the root JS file, either absolute or relative to JS root'
      })
      .option('output-file', {
        description: 'File name where to store the resulting bundle',
        default: 'main.jsbundle',
      })
      .option('plist-file', {
        description: "Relative location to the project's Info.plist (iOS only)",
      })
      .option('gradle-file', {
        description: "Relative location to the project's build.gradle (android only)",
      })
      .option('dev',  {
        default: false,
        description: 'If false, warnings are disabled and the bundle is minified'
      })
<<<<<<< HEAD
      .option('platform',  {
        description: 'Which platform to build',
        choices: ['ios', 'android'],
        required: true
      })
=======
>>>>>>> AppHubPlatform/master
      .help('help')
      .argv

    var buildDirName = argv.platform + BUILD_DIR_SUFFIX;

    var entryFile = argv.entryFile || "index." + argv.platform + ".js";

    var plistFile = argv.plistFile ||
      path.join('ios', require(path.join(process.cwd(), 'package.json')).name, 'Info.plist');
<<<<<<< HEAD

    var gradleFile = argv.gradleFile || path.join('android', 'build.gradle');

    var outputZip = path.join(process.cwd(), argv.outputZip);
    var tmpDir = path.join('/tmp', 'apphub', uuid.v4());
    var buildDir = path.join(tmpDir, buildDirName);
=======
    var outputZip = path.join(process.cwd().replace(/ /g, '\\ '), argv.outputZip);
    var tmpDir = path.join('/tmp', 'apphub', uuid.v4());
    var buildDir = path.join(tmpDir, BUILD_DIR_NAME);
>>>>>>> AppHubPlatform/master
    mkdirp.sync(buildDir);

    var options = [
      '--entry-file', entryFile,
      '--dev', argv.dev,
      '--bundle-output', path.join(buildDir, argv.outputFile),
      '--assets-dest', buildDir,
      '--platform', 'ios',
    ];

<<<<<<< HEAD
    var cmds = ['react-native bundle ' + options.join(' ')]

    if (argv.platform === 'ios') {
      cmds.push('cp ' + plistFile + ' ' + buildDir)
    }
    else {
      cmds.push('cp ' + gradleFile + ' ' + buildDir)
    }

    cmds.push('cd ' + tmpDir + ' && zip -r ' + outputZip + ' ' + buildDirName)
    
=======
    var cmds = [
      'node node_modules/react-native/local-cli/cli.js bundle ' + options.join(' '),
      'cp ' + plistFile + ' ' + buildDir,
      'cd ' + tmpDir + ' && zip -r ' + outputZip + ' ' + BUILD_DIR_NAME,
    ];
>>>>>>> AppHubPlatform/master
    for (var i = 0; i < cmds.length; i++) {
      var cmd = cmds[i];
      console.log(cmd);
      execSync(cmd, { stdio: [0, 1, 2] });
    }
  })
  .help('help')
  .argv;
