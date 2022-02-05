var xmlRpc = require('wordpress-rpc');

/**
 * XML-RPC wordPress API
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API
 * @param xmlRpc
 * @param username
 * @param password
 * @param options
 * @param callback
 */

function wordPress(username, password, options) {
  this.xmlRpc = new xmlRpc(options);
  this.username = username;
  this.password = password;

  this.params = [];
  this.methodName = '';
}

/**
 * send request
 * @param callback
 */
wordPress.prototype.send = function (callback) {
  const params = this.params;

  this.params = [];
  this.xmlRpc.call(this.methodName, params, (errors, json) => {
    // handle errors
    const err = errors || (json.html && json.html.body) || (json.methodResponse && json.methodResponse.fault && json.methodResponse.params)
    const res = err ? {} : json.methodResponse.params[0]

    typeof callback === 'function' && callback(err, res)
  });
};

/**
 *  add parameter
 * @param data
 */
wordPress.prototype.addParam = function (data) {
  if (data) this.params.push(data);

  return this;
};

/**
 * === XML-RPC wordPress API/Posts ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts
 *
 */
/**
 * Retrieve a post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param array
 *            bields
 *
 * @returns object
 */
wordPress.prototype.getPost = function (blog_id, post_id, fields) {

  this.methodName = "wp.getPost";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_id);
  this.addParam(fields);

  return this;
};

/**
 * Retrieve list of posts of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPosts
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 * @param array fields
 *
 * @returns object
 */
wordPress.prototype.getPosts = function (blog_id, filter, fields) {

  this.methodName = "wp.getPosts";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(filter);
  this.addParam(fields);

  return this;
};

/**
 * Create a new post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.newPost
 *
 * @param int
 *            blog_id
 * @param object
 *            content
 *
 * @returns post_id int
 */
wordPress.prototype.newPost = function (blog_id, content) {

  this.methodName = "wp.newPost";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(content);

  return this;
};

/**
 * Edit an existing post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.editPost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param object
 *            content
 *
 * @returns boolean
 */
wordPress.prototype.editPost = function (blog_id, post_id, content) {
  this.methodName = "wp.editPost";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_id);
  this.addParam(content);

  return this;
};

/**
 * Delete an existing post of any registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.deletePost
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 *
 * @returns boolean
 */
wordPress.prototype.deletePost = function (blog_id, post_id) {
  this.methodName = "wp.deletePost";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_id);

  return this;
};

/**
 * Retrieve a registered post type.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostType
 *
 * @param int
 *            blog_id
 * @param string
 *            post_type_name
 * @param array
 *            fields
 *
 * @returns object
 */
wordPress.prototype.getPostType = function (blog_id, post_type_name, fields) {
  this.methodName = "wp.getPostType";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_type_name);
  this.addParam(fields);

  return this;
};

/**
 * Retrieve list of registered post types.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostTypes
 *
 * @param int
 *            blog_id
 * @param array
 *            filter
 * @param array
 *            fields
 *
 * @returns object
 */
wordPress.prototype.getPostTypes = function (blog_id, filter, fields) {
  this.methodName = "wp.getPostTypes";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(filter);
  this.addParam(fields);

  return this;
};

/**
 * Retrieve list of post formats.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostFormats
 *
 * @param int
 *            blog_id
 * @param array
 *            filter
 *
 * @returns object
 */
wordPress.prototype.getPostFormats = function (blog_id, filter) {
  this.methodName = "wp.getPostFormats";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(filter);

  return this;
};

/**
 * Retrieve list of supported values for post_status field on posts.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostStatusList
 *
 * @param int
 *            blog_id
 *
 * @returns object
 */
wordPress.prototype.getPostStatusList = function (blog_id) {
  this.methodName = "wp.getPostStatusList";
  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);

  return this;
};

/**
 * === XML-RPC wordPress API/Taxonomies ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies
 *
 * These XML-RPC methods are for interacting with taxonomies and terms.
 * Taxonomies (for categories, tags, and custom taxonomies) - Added in wordPress
 * 3.4
 */

/**
 * Retrieve information about a taxonomy.
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTaxonomy
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 *
 * @returns object
 */
wordPress.prototype.getTaxonomy = function (blog_id, taxonomy) {
  this.methodName = "wp.getTaxonomy";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(taxonomy);

  return this;
};

/**
 * Retrieve a list of taxonomies.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTaxonomies
 *
 * @param int
 *            blog_id
 *
 * @returns object
 */
wordPress.prototype.getTaxonomies = function (blog_id) {
  this.methodName = "wp.getTaxonomies";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);

  return this;
};

/**
 * Retrieve a taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTerm
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param term_id
 *
 * @returns object
 */
wordPress.prototype.getTerm = function (blog_id, taxonomy, term_id) {
  this.methodName = "wp.getTerm";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(taxonomy);
  this.addParam(term_id);

  return this;
};

/**
 * Retrieve list of terms in a taxonomy.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.getTerms
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param object
 *            filter
 *
 * @returns array
 *
 */
wordPress.prototype.getTerms = function (blog_id, taxonomy, filter) {
  this.methodName = "wp.getTerms";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(taxonomy);
  this.addParam(filter);

  return this;
};

/**
 * Create a new taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.newTerm
 *
 * @param int
 *            blog_id
 * @param object
 *            content
 *
 * @returns int term_id
 *
 */
wordPress.prototype.newTerm = function (blog_id, content) {
  this.methodName = "wp.newTerm";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(content);

  return this;
};

/**
 * Edit an existing taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.editTerm
 *
 * @param int
 *            blog_id
 * @param int
 *            term_id
 * @param object
 *            content
 *
 * @returns boolean
 */
wordPress.prototype.editTerm = function (blog_id, term_id, content) {
  this.methodName = "wp.editTerm";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(term_id);
  this.addParam(content);

  return this;
};

/**
 * Delete an existing taxonomy term.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Taxonomies#wp.deleteTerm
 *
 * @param int
 *            blog_id
 * @param string
 *            taxonomy
 * @param int
 *            term_id
 *
 * @returns boolean
 */
wordPress.prototype.deleteTerm = function (blog_id, taxonomy, term_id) {
  this.methodName = "wp.deleteTerm";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(taxonomy);
  this.addParam(term_id);

  return this;
};

/**
 * XML-RPC wordPress API/Media
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media
 *
 */

/**
 * Retrieve a media item (i.e, attachment).
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.getMediaItem
 *
 * @param int
 *            blog_id
 * @param int
 *            attachment_id
 *
 * @returns object
 */
wordPress.prototype.getMediaItem = function (blog_id, attachment_id) {
  this.methodName = "wp.getMediaItem";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(attachment_id);

  return this;
};

/**
 * Retrieve list of media items.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.getMediaLibrary
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 *
 * @returns array
 */
wordPress.prototype.getMediaLibrary = function (blog_id, filter) {
  this.methodName = "wp.getMediaLibrary";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(filter);

  return this;
};

/**
 * Upload a media file.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Media#wp.uploadFile
 *
 * @param int
 *            blog_id
 * @param object
 *            data
 *
 * @returns object
 */
wordPress.prototype.uploadFile = function (blog_id, data) {
  this.methodName = "wp.uploadFile";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(data);

  return this;
};

/**
 * === XML-RPC wordPress API/Comments ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments
 */

/**
 * Retrieve comment count for a specific post.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getCommentCount
 *
 * @param int
 *            blog_id
 * @param string
 *            post_id
 *
 * @returns array
 *
 */
wordPress.prototype.getCommentCount = function (blog_id, post_id) {
  this.methodName = "wp.getCommentCount";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_id);

  return this;
};

/**
 * Retrieve a comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 *
 * @returns object
 */
wordPress.prototype.getComment = function (blog_id, comment_id) {
  this.methodName = "wp.getComment";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(comment_id);

  return this;
};

/**
 * Retrieve list of comments.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getComments
 *
 * @param int
 *            blog_id
 * @param object
 *            filter
 *
 * @return array
 */
wordPress.prototype.getComments = function (blog_id, filter) {
  this.methodName = "wp.getComments";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(filter);

  return this;
};

/**
 * Create a new comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.newComment
 *
 * @param int
 *            blog_id
 * @param int
 *            post_id
 * @param object
 *            comment
 *
 * @returns int comment_id
 */
wordPress.prototype.newComment = function (blog_id, post_id, content) {
  this.methodName = "wp.newComment";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(post_id);
  this.addParam(content);

  return this;
};

/**
 * Edit an existing comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.editComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 * @param object
 *            comment
 *
 * @returns boolean
 */
wordPress.prototype.editComment = function (blog_id, comment_id, comment) {
  this.methodName = "wp.editComment";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(comment_id);
  this.addParam(comment);

  return this;
};

/**
 * Remove an existing comment.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.deleteComment
 *
 * @param int
 *            blog_id
 * @param int
 *            comment_id
 *
 * @return boolean
 */
wordPress.prototype.deleteComment = function (blog_id, comment_id) {
  this.methodName = "wp.deleteComment";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(comment_id);

  return this;
};

/**
 * Retrieve list of comment statuses.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Comments#wp.getCommentStatusList
 *
 * @param int
 *            blog_id
 *
 * @returns array
 *            struct
 *              string (key): status value
 *              string (value): status description
 */
wordPress.prototype.getCommentStatusList = function (blog_id) {
  this.methodName = "wp.getCommentStatusList";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);

  return this;
};

/**
 * === XML-RPC wordPress API/Options ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options
 */

/**
 * Retrieve blog options.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options#wp.getOptions
 *
 * @param int
 *            blog_id
 * @param array
 *            options List of option names to retrieve. If omitted, all options
 *            will be retrieved.
 *
 * @returns
 *    struct
 *      string desc
 *      string value
 *      bool readonly
 *
 * This method will only return white-listed options. If a
 *          non-white-listed option is included in options, it will be omitted
 *          from the response.
 */
wordPress.prototype.getOptions = function (blog_id, options) {
  this.methodName = "wp.getOptions";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(options);

  return this;
};

/**
 * Edit blog options.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Options#wp.setOptions
 *
 * @param int
 *            blog_id
 * @param array
 *            options keys are option names, values are the new option values.
 *
 * @returns array the options with updated values.
 */
wordPress.prototype.setOptions = function (blog_id, options) {
  this.methodName = "wp.setOptions";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);
  this.addParam(options);

  return this;
};

/**
 * === XML-RPC wordPress API/Users ===
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users
 */

/**
 * Retrieve list of blogs for this user.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users#wp.getUsersBlogs
 *
 * @return array
 */
wordPress.prototype.getUsersBlogs = function () {
  this.methodName = "wp.getUsersBlogs";

  this.addParam(this.username);
  this.addParam(this.password);

  return this;
};

/**
 * Retrieve list of all authors.
 *
 * http://codex.wordpress.org/XML-RPC_WordPress_API/Users#wp.getAuthors
 *
 * @param int
 *            blog_id
 * @returns array
 */
wordPress.prototype.getAuthors = function (blog_id) {
  this.methodName = "wp.getAuthors";

  this.addParam(blog_id);
  this.addParam(this.username);
  this.addParam(this.password);

  return this;
};

module.exports = wordPress

