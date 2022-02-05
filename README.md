## Vuepress Plugin To WordPress

A plugin uses XmlRpc to synchronize Vuepress content to
WordPress, implements all the interfaces in [XML-RPC_WordPress_API](http://codex.wordpress.org/XML-RPC_WordPress_API).

### use:

```js
plugins: [
  //...
     ['vuepress-plugin-to-wordpress', {
       username: 'root',
       password: 'root',
       options: {
         https: false,
         host: 'localhost',
         port: 80,
         path: "/wordpress/xmlrpc.php"
       },
       onPrepared: (wpRpc, app) => {
         app.pages.forEach(page => {
           const content = {
             post_author: 1,
             post_type: 'post',
             post_title: page.frontmatter.title,
             post_content: page.frontmatter.content,
           }
           wpRpc.newPost(1, content).send((err, data) => {
             console.log(err, data)
             // ...
           })
         })
       }
     }]
  //...
]
```

Refer to tests/wordpress-test.js for other API interfaces

### test

```shell
npm run test
```