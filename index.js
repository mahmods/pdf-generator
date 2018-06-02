const express = require('express')
var phantom = require('phantom');
var uniqueFilename = require('unique-filename')
const app = express()

app.get('/', function (req, res) {
    var filename = uniqueFilename('downloads', 'study-pdf') + ".pdf"
    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            page.property('userAgent', 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0');
            page.property('paperSize', {
                format: 'A4',
                orientation: 'portrait',
              });
            page.open("http://localhost:8080/new-gadwa/get-pdf/12").then(function(status) {
                page.render(filename).then(function() {
                    console.log('Page Rendered');
                    ph.exit();
                    var options = {
                        root: __dirname ,
                        dotfiles: 'deny',
                        headers: {
                            'x-timestamp': Date.now(),
                            'x-sent': true,
                            'Content-type': 'application/pdf',
                            'Content-Disposition': 'attachment',
                            'filename': filename
                        }
                      };
                    res.sendFile(filename, options)
                });
            });
        });
    });
  })

app.listen(3000, () => console.log('Example app listening on port 3000!'))