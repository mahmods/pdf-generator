var phantom = require('phantom');
var uniqueFilename = require('unique-filename')

var filename = uniqueFilename('downloads', 'study-pdf') + ".pdf"
phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.property('userAgent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11');
        page.property('paperSize', {
            format: 'A4',
            orientation: 'portrait',
            });
        page.open("http://localhost:8080/new-gadwa/get-pdf/12").then(function(status) {
            page.render(filename).then(function() {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
});