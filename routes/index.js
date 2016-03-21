var express = require('express');
var router = express.Router();
var util = require('util');

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var texts;

    if (req.query.text) {
        texts = req.query.text;

        if (!util.isArray(texts)) {
            texts = [texts];
        }
    } else {
        texts = [
            'We\'re made of star stuff',
            'We are a way of the cosmos to know itself',
            "Look again at that dot. That's here. That's home. That's us.",
            "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives."
        ];
    }
    var groups = [];

    var mode = req.query.mode ? req.query.mode.toLowerCase() : '7bit';

    if (mode !== '7bit' && mode !== '8bit') {
        res.status(400);
        res.render('error', { message: "invalid mode: " + mode, error: { status: 400}});
        return;
    }

    texts.forEach(function(text) {
        var buff = new Buffer(text, 'utf8');
        var bytes = [],
            icons = [];

        for (var i = 0; i < buff.length; i++) {
            var byte = dec2bin(buff[i]);
            while (byte.length < 8) {
                byte = '0' + byte;
            }
            bytes.push(byte);

            for (var j = 0; j < byte.length; j += 2) {
                if (0 === j && '7bit' === mode) {
                    icons.push(byte[1]);
                } else {
                    icons.push(byte.substring(j, j + 2));
                }
            }
        }

        groups.push({
            text: text,
            icons: icons
        });
    });

    res.render('index', {
        groups: groups,
        mode: mode,
        legend: ['0', '1', '00', '01', '10', '11']
    });
});

module.exports = router;
