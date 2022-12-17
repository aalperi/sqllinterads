'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "sql-linter-ads" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('sql-linter-ads.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!');
    }));

    vscode.languages.registerDocumentFormattingEditProvider('sql-lang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
            }
            throw new Error('Formatting provider load failed');
        }
    });
}
