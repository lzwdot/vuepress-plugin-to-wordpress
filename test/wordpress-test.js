const WordPress = require('../lib/wordpress-api')
const util = require('util');
const path = require('path')
const fs = require('fs')

// Change to your configuration
const config = {
  username: 'root',
  password: 'root',
  options: {path: '/wordpress/xmlrpc.php'},
}
const wp = new WordPress(config.username, config.password, config.options);

let msg = []

function test(tips, callback) {
  callback(tips)
}

function log(tips) {
  console.log(tips)
  msg.forEach(s => {
    console.log(util.inspect(s, {colors: true}))
  })
  msg = []
}

function equal(a, b, res) {
  try {
    msg.push(`${a} = ${b} ========> ${a == b ? res : 'NO'}`)
  } catch (e) {
    console.log(e)
  }
}

test("WordPress.getPost", function (tips) {
  wp.getPost(1, 1).send((err, object) => {
    equal(true, typeof object == "object", "Type OK");
    equal("世界，您好！", object.post_title, "OK");

    log(tips)
  });
});

test("WordPress.getPosts", function (tips) {
  wp.getPosts(1, {post_type: "post"}).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});

test("WordPress.newPost", function (tips) {
  const data = {
    post_type: 'post',
    post_status: 'draft',
    post_title: 'newPost',
    post_author: 1,
    post_excerpt: '',
    post_content: '通过Wordpress Xmlrpc API 创建文章测试',
    post_format: ''
  };
  wp.newPost(1, data).send((err, object) => {
    equal(true, object > 0, "Post created");

    wp.deletePost(1, object).send();

    log(tips)
  });
});

test("WordPress.editPost", function (tips) {
  wp.editPost(1, 1, {
    post_content: "欢迎使用 WordPress。这是系统自动生成的演示文章。编辑或者删除它，然后开始您的博客！\n\n测试:通过Wordpress Xmlrpc API 编辑文章"
  }).send((err, object) => {
    equal(true, object, "Edit ok");

    log(tips)
  });
});
test("WordPress.deletePost", function (tips) {
  const data = {
    post_type: 'post',
    post_status: 'draft',
    post_title: 'newPost',
    post_author: 1,
    post_excerpt: '',
    post_content: '通过Wordpress Xmlrpc API 创建文章测试',
    post_format: ''
  };
  wp.newPost(1, data).send((err, object) => {
    wp.deletePost(1, object).send((err, object) => {
      equal(true, object, "Post sucessfully deleted");

      log(tips)
    })
  })
});
test("WordPress.getPostType", function (tips) {
  wp.getPostType(1, "post").send((err, object) => {
    equal(true, typeof object == "object", "OK");
    equal(object.name, "post", "OK");

    log(tips)
  })
});
test("WordPress.getPostTypes", function (tips) {
  filter = ['labels', 'capabilities', 'taxonomies'];
  fields = ['label', 'name'];
  wp.getPostTypes(1, [], fields).send((err, object) => {
    equal(typeof object.attachment, "object", "Support attachement type");
    equal(typeof object.page, "object", "Support page type");
    equal(typeof object.post, "object", "Support post type");

    log(tips)
  })
});
test("WordPress.getPostFormats", function (tips) {
  wp.getPostFormats(1).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })

});
test("WordPress.getPostFormats", function (tips) {
  wp.getPostStatusList(1).send((err, object) => {
    equal(true, typeof object == "object", "OK");
    equal(typeof object.draft, "string", "Have draft");
    equal(typeof object.pending, "string", "Have pending");
    equal(typeof object.private, "string", "Have private");
    equal(typeof object.publish, "string", "Have publish");

    log(tips)
  })
});

test("WordPress.getTaxonomy", function (tips) {
  wp.getComment(1, 23).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});
test("WordPress.getTaxonomies", function (tips) {
  wp.getTaxonomies(1).send((err, object) => {
    equal(true, object.length >= 0, "OK");

    log(tips)
  })
});
test("WordPress.getTerm", function (tips) {
  wp.getTerm(1, 'category', 1).send((err, object) => {
    equal(true, parseInt(object.term_id, 10) === 1, "Call getTerm is OK");

    log(tips)
  })
});
test("WordPress.getTerms", function (tips) {
  wp.getTerms(1, 'category').send((err, object) => {
    equal(true, object.length >= 0, "OK");

    log(tips)
  })
});
test("WordPress.newTerm", function (tips) {
  wp.newTerm(1, {
    name: '技术文章',
    taxonomy: 'category',
    slug: 'technical-articles',
    description: '此分类下的文章属于技术相关的文章'
  }).send((err, object) => {
    const term_id = object.valueOf();
    equal(true, term_id >= 0, "Term " + term_id + "is created.");

    wp.editTerm(1, term_id, {
      name: '技术文章',
      taxonomy: 'category',
      slug: 'technical-articles',
      description: '此分类下的文章属于技术相关的文章'
    }).send((err, object) => {
      equal(true, object, "Term " + term_id + " is edited");

      wp.deleteTerm(1, 'category', term_id).send((err, object) => {
        equal(true, object, "Term " + term_id + " is deleted");

        log(tips)
      })
    });
  });
});

test("WordPress.getMediaItem", function (tips) {
  wp.getMediaItem(1, 1).send((err, object) => {
    equal(true, parseInt(object.attachment_id, 10) > 0, 'OK');

    log(tips)
  })
});
test("WordPress.getMediaLibrary", function (tips) {
  wp.getMediaLibrary(1).send((err, object) => {
    equal(true, typeof object == "object", "Result is OK");
    equal(true, object.length >= 0, 'OK');

    log(tips)
  })
});
test("WordPress.uploadFile", function (tips) {
  wp.uploadFile(1, {
    name: '201206300258.png',
    type: 'image/png',
    bits: fs.readFileSync(path.join(__dirname, 'test.png')),
    overwrite: true
  }).send((err, object) => {
    equal(true, parseInt(object.id, 10) > 0, "Image successfully uploaded");

    log(tips)
  })
});

test("WordPress.getCommentCount", function (tips) {
  wp.getCommentCount(1, 1).send((err, object) => {
    equal(true, typeof object == "object", "Result is OK");
    equal(true, object.approved >= 0, "Ok");

    log(tips)
  })
});
test("WordPress.getComment", function (tips) {
  wp.getComment(1, 1).send((err, object) => {
    equal(true, typeof object == "object", "Result is OK");
    equal(true, object.comment_id >= 0, "The comment is valid.");

    log(tips)
  })
});
test("WordPress.getComments", function (tips) {
  wp.getComments(1).send((err, object) => {
    equal(true, typeof object == "object", "Result is OK");
    equal(true, object.length >= 0, "getComments results is OK");

    log(tips)
  })
});

test("WordPress.newComment", function (tips) {
  // Test newComment and deleteComment
  wp.newComment(1, 1, {content: 'This is a new comment from xmlrpc mimic javascript client 1'}).send((err, object) => {
    const comment_id = object
    equal(typeof comment_id, "number", "Result is OK");
    wp.deleteComment(1, comment_id).send((err, object) => {
      equal(true, object, "Comment id " + comment_id + " deleted");

      log(tips)
    })
  });
});

test("WordPress.editComment", function (tips) {
  wp.newComment(1, 1, {content: 'This is a new comment from xmlrpc mimic javascript client 2'}).send((err, object) => {
    const comment_id = object
    wp.editComment(1, comment_id, {
      content: 'Modified by he',
      author: "mywordpress",
      author_url: "http://www.wordpress.com/",
      author_email: "user@wordpress.com"
    }).send((err, object) => {
      wp.deleteComment(1, parseInt(comment_id, 10)).send((err, object) => {

        equal(typeof object, "boolean", "Result is OK");
        equal(true, object, "edited");

        log(tips)
      })
    });
  });
});

test("WordPress.getCommentStatusList", function (tips) {
  wp.getCommentStatusList(1).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});

test("WordPress.getOptions", function (tips) {
  wp.getOptions(1).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});

test("WordPress.setOptions", function (tips) {
  wp.setOptions(1, {software_version: '3.4.2'}).send((err, object) => {
    equal(true, typeof object == "object", "OK");
    equal(true, object.software_version.value != '3.4.2', "Verify that the readonly can not be set is OK");

    wp.setOptions(1, {medium_size_h: '300'}).send((err, object) => {
      equal(true, parseInt(object.medium_size_h.value, 10) === 300, "Option setting is correct");

      log(tips)
    })
  });
});
test("WordPress.getUsersBlogs", function (tips) {
  wp.getUsersBlogs().send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});
test("WordPress.getAuthors", function (tips) {
  wp.getAuthors(1).send((err, object) => {
    equal(true, typeof object == "object", "OK");

    log(tips)
  })
});