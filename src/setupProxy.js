const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  ["/api", "/auth"].forEach((v) => {
    app.use(
      v,
      createProxyMiddleware({
        target: "http://localhost:8000",
      })
    );
  });
};
