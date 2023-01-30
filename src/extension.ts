'use strict';
import * as vscode from 'vscode';
import { formatSql } from 'poor-mans-t-sql-formatter';

export const activate = (context: vscode.ExtensionContext) => {

    const formatDisposable = vscode.commands.registerTextEditorCommand('poorSql2.format', function (activeEditor, activeEditorEdit) {
        formatWithOptions(activeEditor, activeEditorEdit, getFormatterOptions());
    });
    context.subscriptions.push(formatDisposable);

    vscode.languages.registerDocumentFormattingEditProvider('sql', {
        provideDocumentFormattingEdits(document: vscode.TextDocument)  {
            const active = vscode.window.activeTextEditor;
            if(active){
                const { range } = getTextInfo(active);
                const options = getFormatterOptions();
                vscode.window.showInformationMessage(options.spacesPerTab.toString());
                const transformed = formatSql(document.getText(), options || getFormatterOptions());
                if (transformed.errorFound) {
                    vscode.window.showInformationMessage('There was an error while formatting your SQL.');
                } else {
                    return [vscode.TextEdit.replace(range,transformed.text)];
                }
            }
            
        }
    });    
};

const formatWithOptions = (activeEditor: vscode.TextEditor, activeEditorEdit: vscode.TextEditorEdit, options:vscode.FormattingOptions) => {
    const { text, range } = getTextInfo(activeEditor);
    const transformed = formatSql(text, options || getFormatterOptions());

    if (transformed.errorFound) {
        vscode.window.showInformationMessage('There was an error while formatting your SQL.');
    } else {
        return [activeEditorEdit.replace(range,transformed.text)];
    }
};


const getTextInfo = (activeEditor:vscode.TextEditor) => {
    const { selection, document } = activeEditor;
    let { start, end } = selection;

    if (start.line > end.line || (start.line === end.line && start.character >= end.character)) {
        ({ start, end } = getRangeForDocument(document));
    }
    
    const range = new vscode.Range(start.line, start.character, end.line, end.character);
    
    const text = document.getText(range);

    return {
        text,
        range
    };
};

const getFormatterOptions = (isObfuscate = false):vscode.FormattingOptions => {
    const settings = vscode.workspace.getConfiguration('poorSql2');

    const options = Object.assign({}, settings);
    const addOnn = {indent: options.tabIndent ? '\t' : ' '.repeat(options.numIndentSpaces || 4),
    spacesPerTab: options.numIndentSpaces};
    
    const newOptions = {...options,...addOnn};
    if (isObfuscate) {
        return Object.assign({}, newOptions, options.obfuscate, {
            formattingType: 'obfuscation'
        });
    }
    return newOptions as unknown as vscode.FormattingOptions;
};

const getRangeForDocument = (document: vscode.TextDocument) => {
    const lastLine = document.lineCount - 1;
    const lastLineObj = document.lineAt(lastLine);

    const lastChar = lastLineObj.range.end.character;

    const start = { character: 0, line: 0 };
    const end = { character: lastChar, line: lastLine };

    return new vscode.Range(start.line, start.character, end.line, end.character);
};