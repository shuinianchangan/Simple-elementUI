module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ["iconfont.js"],
  extends: [
    "plugin:vue/recommended",
    "@vue/airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 使用双引号
        semi: true, // 使用分号
        endOfLine: "auto", // 自动检测行尾符
      },
    ],
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "array-element-newline": ["error", "consistent"],
    "no-new": "off",
    "linebreak-style": "off",
    quotes: ["error", "double"], // 强制使用双引号
    semi: ["error", "always"], // 强制使用分号
    "import/extensions": "off",
    "no-shadow": "off",
    "no-unused-vars": "warn",
    "import/no-cycle": "off",
    eqeqeq: "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-continue": "off",
    "prefer-destructuring": "off",
    "no-plusplus": "off",
    "prefer-const": "off",
    "global-require": "off",
    "no-prototype-builtins": "off",
    "consistent-return": "off",
    "vue/require-component-is": "off",
    "one-var-declaration-per-line": "off",
    "one-var": "off",
    "import/named": "off",
    "default-case": "off",
    "import/order": "off",
    "func-names": "off",
    radix: "off",
    "no-unused-expressions": "off",
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "no-restricted-syntax": "off",
    "no-mixed-operators": "off",
    "no-await-in-loop": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "no-return-assign": "off",
    "vue/multi-word-component-names": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "vuejs-accessibility/mouse-events-have-key-events": "off",
    "vuejs-accessibility/alt-text": "off",
    "vue/no-mutating-props": "off",
  },
};
