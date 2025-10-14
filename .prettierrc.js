module.exports = {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-jsdoc'],
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  /**
   * Prettier-plugin-organize-imports: Don't want destructive code actions (like removing unused
   * imports)
   */
  organizeImportsSkipDestructiveCodeActions: true,
  /**
   * Prettier-plugin-jsdoc
   *
   * See: https://www.npmjs.com/package/prettier-plugin-jsdoc
   */
  tsdoc: true
};
