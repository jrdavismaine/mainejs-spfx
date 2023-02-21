'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(
    `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

// execute before the TypeScript subtask
let helloWorldTask = build.subTask(
    'image-resize-subtask',
    function (gulp, buildOptions, done) {
        this.log('HELLO WORLD TASK');
        done();
    }
);
build.rig.addPreBuildTask(helloWorldTask);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
    var result = getTasks.call(build.rig);
    result.set('serve', result.get('serve-deprecated'));
    return result;
};

build.initialize(require('gulp'));
