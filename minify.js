const Handlebars = require("handlebars");
const UglifyJS = require("uglify-js");
const fs = require("fs");
const esprima = require("esprima");
const path = require("path");

const GREEN = "\x1b[32m%s\x1b[0m";
const YELLOW = "\x1b[33m%s\x1b[0m";
const RED = "\x1b[31m%s\x1b[0m";

const trim = (string) => string.replace(/^\s+|\s+$/g, "");

const MINIFY_OPTIONS = {
  warnings: false,
  ie8: true,
  toplevel: true,
  mangle: {
    reserved: ["sa"],
  },
  nameCache: null,
};

const IS_TESTING = process.argv[2] === "testing";
if (IS_TESTING) console.log(YELLOW, "Running the scripts as testing");

const DEFAULTS = {
  testing: IS_TESTING,
  minify: true,
  duration: true,
  events: true,
  hash: true,
  scroll: true,
  spa: true,
  uniques: true,
  online: false,
  saGlobal: "sa_event",
  url: "docs.simpleanalytics.com/script",
};

const files = [
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `hello.js`,
    variables: {
      ...DEFAULTS,
      baseUrl: "simpleanalyticscdn.com",
      apiUrlPrefix: "queue.",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `latest.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      baseUrl: "simpleanalyticscdn.com",
      apiUrlPrefix: "queue.",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `cloudflare.js`,
    variables: {
      ...DEFAULTS,
      minify: false,
      version: 1,
      baseUrl: "{{cloudFlareCustomDomain}}",
      overwriteOptions: {
        saGlobal: "INSTALL_OPTIONS.saGlobal",
        mode: "INSTALL_OPTIONS.mode",
        skipDnt: "INSTALL_OPTIONS.recordDnt",
      },
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `custom/app.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      baseUrl: "{{nginxHost}}",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `custom/e.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      saGlobal: "sa",
      baseUrl: "{{nginxHost}}",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `custom/latest.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      baseUrl: "{{nginxHost}}",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `custom/proxy.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      baseUrl: "{{nginxProxyHost}}",
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `light.js`,
    variables: {
      ...DEFAULTS,
      version: 3,
      baseUrl: "{{nginxHost}}",
      duration: false,
      events: false,
      scroll: false,
      uniques: false,
      online: false,
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/default.js`,
    output: `custom/light.js`,
    variables: {
      ...DEFAULTS,
      baseUrl: "{{nginxHost}}",
      version: 3,
      duration: false,
      events: false,
      scroll: false,
      uniques: false,
      online: false,
    },
  },
  {
    type: "js",
    input: `${__dirname}/src/embed.js`,
    output: `embed.js`,
    variables: {
      minify: true,
      version: 1,
      script: "embed.js",
      url: "docs.simpleanalytics.com/embed-graph-on-your-site",
    },
  },
];

for (const file of files) {
  const { variables, input, output } = file;
  const name = output.toUpperCase();
  const versionFile = `${__dirname}/dist/v${variables.version}/${output}`;
  const latestFile = `${__dirname}/dist/latest/${output}`;

  const contents = fs
    .readFileSync(input, "utf8")
    .replace(/\"\{\{\s?version\s?\}\}"/g, variables.version || 0)
    .replace(/\/\*\*\s?/g, "{{")
    .replace(/\s?\*\*\//g, "}}")
    .replace(/{{end(if|unless)/g, "{{/$1")
    .replace(/{{(if|unless)/g, "{{#$1");

  const finalFileName = output.split("/").pop();

  const template = Handlebars.compile(contents);
  const { code: codeTemplate, map, warnings } = variables.minify
    ? UglifyJS.minify(
        {
          [finalFileName]: trim(
            template({
              ...variables,
              overwriteOptions: "{{overwriteOptions}}",
            })
          ),
        },
        {
          ...MINIFY_OPTIONS,
          sourceMap: {
            includeSources: false,
            filename: finalFileName,
            url: `${finalFileName}.map`,
          },
        }
      )
    : {
        code: trim(
          template({
            ...variables,
            overwriteOptions: "{{overwriteOptions}}",
          })
        ),
      };

  if (!codeTemplate)
    console.warn(RED, `[MINIFY][${name}] codeTemplate is undefined`);
  if (!template) console.warn(RED, `[MINIFY][${name}] template is undefined`);

  for (const warning of warnings || [])
    console.warn(YELLOW, `[MINIFY][${name}] ${warning}`);

  const code = codeTemplate
    .replace(
      /\{\{\s?nginxHost\s?\}\}/gi,
      '<!--# echo var="http_host" default="" -->'
    )
    .replace(
      /\{\{\s?nginxProxyHost\s?\}\}/gi,
      '<!--# echo var="proxy_hostname" default="" --><!--# echo var="proxy_path" default="/simple" -->'
    )
    .replace(
      /"\{\{\s?overwriteOptions\s?\}\}"/gi,
      variables.overwriteOptions
        ? JSON.stringify(variables.overwriteOptions).replace(
            /:"([^"]+)"/gi,
            ":$1"
          )
        : "{}"
    )
    .replace(
      /"\{\{\s?cloudFlareCustomDomain\s?\}\}"/gi,
      'INSTALL_OPTIONS.custom_domain || "queue.simpleanalyticscdn.com"'
    );

  const date = new Date().toISOString().slice(0, 10);
  const hash = require("crypto")
    .createHash("sha256")
    .update(code)
    .digest("hex")
    .slice(0, 4);

  const prepend = `/* Simple Analytics - Privacy friendly analytics (docs.simpleanalytics.com/script; ${date}; ${hash}) */`;
  const lines = [prepend, "", code].join("\n");

  const validate = template({
    ...variables,
    hostname: "sa.example.com",
    script: "sa.example.com/app.js",
  });

  try {
    esprima.parseScript(validate);
  } catch (error) {
    const { index, lineNumber, description } = error;
    console.log(
      RED,
      `[MINIFY][${name}][ERROR] ${input
        .split("/")
        .pop()} ${description} at line ${lineNumber} position ${index}`
    );
    continue;
  }

  if (variables.version) {
    fs.mkdirSync(path.dirname(versionFile), { recursive: true });
  }

  fs.mkdirSync(path.dirname(latestFile), { recursive: true });

  if (variables.version) {
    fs.writeFileSync(versionFile, lines);
    if (map) fs.writeFileSync(`${versionFile}.map`, map);
  }

  fs.writeFileSync(latestFile, lines);
  if (map) fs.writeFileSync(`${latestFile}.map`, map);

  const bytes = new TextEncoder("utf-8").encode(lines).length;

  console.log(
    `[MINIFY][${name}] Minified ${input.split("/").pop()} into ${bytes} bytes`
  );
}

console.log(GREEN, `[MINIFY] Done minifying all files`);
