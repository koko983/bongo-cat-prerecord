var player = require('play-sound')(opts = {})
const fs = require('fs')
var parse = require('csv-parse')

function isYes(input) {
    return ['YES', 'Y', 'T', 'TRUE'].includes(input.toUpperCase());
}
player.play('bongo0.mp3')

function meta(fileName, cb) {
    return cb ? () => player.play(fileName, cb) : () => player.play(fileName);
}

function getFileName(input) {
    return (input == 'A') ? 'bongo0.mp3' : 'bongo1.mp3';
}

exports.play = function (callback) {
    player.play('bongo0.mp3')
    const result = [];
    fs.readFile('result.csv', function (err, fileData) {
        parse(fileData, { columns: false, trim: true }, function (err, rows) {
            // Your CSV data is in an array of arrys passed to this callback as rows.
            for (const row of rows) {
                var input = row[1];
                if (isYes(input)) {
                    result.push('A')
                } else {
                    result.push('D')
                }
            }
            callback(result);
            // var currentMeta = null;
            // for (i = result.length - 1; i >= 0; i--) {
            //     const input = result[i];
            //     const fileName = getFileName(input);
            //     currentMeta = meta(fileName, currentMeta);
            // }
            // currentMeta();
            for (let i = 0; i < result.length; i++) {
                setTimeout(() => {
                    const fname = getFileName(result[i]);
                    player.play(fname);
                }, i * 300);
            }
        })
    })
}

