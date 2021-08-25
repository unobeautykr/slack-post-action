/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 160:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 508:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 214:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(160);
const github = __nccwpck_require__(508);
const fetch = __nccwpck_require__(214);

const buildMessage = function ({ title, env, version, date, actor, link }) {
  return {
    message: title,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: title,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Environment:*\n${env}`,
          },
          {
            type: "mrkdwn",
            text: `*Version:*\n${version}`,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*When:*\n${date}`,
          },
          {
            type: "mrkdwn",
            text: `*Initiator:*\n${actor}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<${link}|View detail>`,
        },
      },
    ],
    username: "Hatchery",
    icon_emoji: ":hatching_chick",
  };
};
async function run() {
  try {
    const webhookUrl = core.getInput("webhookUrl");

    const context = github.context;

    fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(
        buildMessage({
          title: core.getInput("title"),
          env: core.getInput("env"),
          version: core.getInput("version"),
          date: new Date().toTimeString(),
          actor: context.actor,
          link: core.getInput("link"),
        })
      ),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;