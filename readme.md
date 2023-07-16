This repo contains sample code for [a serverless Jamstack tutorial](https://docs.digitalocean.com/tutorials/create-a-jamstack-site-using-serverless-functions/) that teaches users how to intergrate serverless functions into their Jamstack site.

Once you complete the tutorial, the sample website contains:

* DigitalOcean Serverless Functions (written in node) as a replacement for traditional backend APIs. The functions retrieve content from a MongoDB and render it on a static HTML page.
* A static HTML website that uses CSS Bootstrap elements for styling and Axios to invoke the functions. The site contains a few JS scripts to dynamically render content.