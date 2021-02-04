

# HTML to PDF Microservice

> Web page PDF rendering done right. Microservice for rendering receipts, invoices, or any content.

**Features:**

* Web interface to generate PDF render
* Converts any URL or HTML content to a PDF file
* Rendered with Headless Chrome, using [Puppeteer](https://github.com/GoogleChrome/puppeteer). The PDFs should match to the ones generated with a desktop Chrome.
* Single-page app (SPA) support. Waits until all network requests are finished before rendering.
* Easy deployment to Kubernetes or any docker runtime.

Usage is as simple as [https://htlmpdfconverter.com?url=https://google.com](https://htlmpdfconverter.com?url=https://google.com). There's also a `POST /api/render` if you prefer to send options in the body.

**Why?**

This microservice is useful when you need to automatically produce PDF files
for whatever reason. The files could be receipts, weekly reports, invoices,
or any content.

PDFs can be generated in many ways, but one of them is to convert HTML+CSS
content to a PDF. This API does just that.

### Good to know

* **By default, page's `@media print` CSS rules are ignored**. We set Chrome to emulate `@media screen` to make the default PDFs look more like actual sites.

* Chrome is launched with `--no-sandbox --disable-setuid-sandbox` flags to fix usage in Heroku. See [this issue](https://github.com/GoogleChrome/puppeteer/issues/290).

* Heavy pages may cause Chrome to crash if the server doesn't have enough RAM.

* Docker image for this can be found here: https://hub.docker.com/repository/docker/xjodoin/htmlpdfconverter


## Examples

Try it [online](https://htmlpdfconverter.com)

Licensing
=========
htmlpdfconverter is licensed under the Apache License, Version 2.0. See
[LICENSE](https://github.com/xjodoin/htmlpdfconverter/blob/master/LICENSE) for the full
license text.