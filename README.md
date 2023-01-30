# README

Inspired by [azure-poor-formatter](https://github.com/wsr-publishing/azure-poor-formatter) made version 2 for onSave support.

This also uses the [Poor Man's T-SQL Formatter](https://github.com/TaoK/PoorMansTSqlFormatter) to format your T-SQL inside Azure Data Studio or Visual Studio Code.

Extension is published as VSIX instead of marketplace.

## Extension Settings

* `poorSql2.tabIndent`: Use tabs for indentation?
* `poorSql2.numIndentSpaces`: Number of spaces to use when indenting. Ignored if tabIndent is true.
* `poorSql2.maxLineWidth`: Max characters per line.
* `poorSql2.statementBreaks`: Number of line breaks between statements.
* `poorSql2.clauseBreaks`: Number of line breaks between clauses within a statement.
* `poorSql2.expandCommaLists`: Expand comma-delimited lists onto new lines?
* `poorSql2.trailingCommas`: Should commas be at the end of lines?
* `poorSql2.spaceAfterExpandedComma`: Should a space be added after commas?
* `poorSql2.expandBooleanExpressions`: Should boolean operators cause a linebreak?
* `poorSql2.expandCaseStatements`: Should WHEN and THEN expressions in a CASE statement cause a linebreak?
* `poorSql2.expandBetweenConditions`: Should arguments of BETWEEN expressions cause linebreaks?
* `poorSql2.expandInLists`: Should IN lists be split by linebreaks?
* `poorSql2.breakJoinOnSections`: Should the ON section of a JOIN clause cause a linebreak?
* `poorSql2.uppercaseKeywords`: Should keywords be automatically uppercased?
* `poorSql2.keywordStandardization`: Should less-common keywords be replaced with common alternatives? (Caution: only safe for T-SQL)
* `poorSql2.obfuscate.randomizeKeywordCase`: Obfuscation: should the case of keywords be randomized?
* `poorSql2.obfuscate.randomizeLineLengths`: Obfuscation: should line lengths be randomized?
* `poorSql2.obfuscate.preserveComments`: Obfuscation: should comments be preserved?
* `poorSql2.obfuscate.enableKeywordSubstitution`: Obfuscation: allow common keywords to be replaced with less common alternatives? (Caution: only safe for T-SQL)

## Getting started

Download zip -file from this repocitory, unzip it and install it as VSIX.

Azure Data Studio: File - Install Extension from VSIX Package.
Visual Studio Code: Extensions - ... (Views and more action) - Install from VSIX.

## Release Notes

### 1.0.0

First release.

- Format t-sql according to configuration
- Choose formatter as defaul formatter and format on save