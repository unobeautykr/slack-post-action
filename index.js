const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

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

function toIsoString(date) {
  const tzo = 9;
  (dif = tzo >= 0 ? "+" : "-"),
    (pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    });

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
}

async function run() {
  try {
    const webhookUrl = core.getInput("webhookUrl");

    const context = github.context;

    await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(
        buildMessage({
          title: core.getInput("title"),
          env: core.getInput("env"),
          version: core.getInput("version"),
          date: toIsoString(new Date()),
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
