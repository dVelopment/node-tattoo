var express = require('express');
var router = express.Router();

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var texts;

    if (req.query.text) {
        texts = [req.query.text];
    } else {
        texts = [
            'We\'re made of star stuff',
            'We are a way of the cosmos to know itself',
            "Look again at that dot. That's here. That's home. That's us.",
            "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives."
        ];
    }
    var groups = [];

    var mode = req.query.mode || 'ascii';

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
                if ('ascii' === mode && 0 === j) {
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

    res.render('index', { groups: groups, mode: mode.toUpperCase() });
});

module.exports = router;
