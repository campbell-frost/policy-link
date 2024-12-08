import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    
    rules: {
      "react/react-in-jsx-scope": "off", 
      "sort-imports": ["warning", {
        "ignoreCase": true,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": true,
        "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
        "allowSeparatedGroups": true
    }]
    },

  },
];
