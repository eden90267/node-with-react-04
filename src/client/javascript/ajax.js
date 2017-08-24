const http = require('http');

exports.post = (option, data) => new Promise((r, j) => {
  let post_options = {
    host: option.host,
    port: option.port,
    path: option.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  if (typeof option.header !== 'undefined') {
    post_options.headers = option.header;
  }
  let post_req = http.request(post_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      r(chunk);
    });
  });
  post_req.write(data);
  post_req.end();
});

exports.get = (option, data) => new Promise((r, j) => {
  let post_options = {
    host: option.host,
    port: option.port,
    path: option.path
  };
  if (typeof option.header !== 'undefined') {
    post_options.headers = option.header;
  }
  let post_req = http.request(post_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      r(chunk);
    });
  });
  post_req.write(data);
  post_req.end();
});