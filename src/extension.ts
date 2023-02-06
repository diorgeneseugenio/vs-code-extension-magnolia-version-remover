import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "magnolia-version-remover-importing-files.removeVersionInformation",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return null;
      }

      const { document } = editor;

      const fileContent = document.getText();

      const newFileContent = fileContent
        .replace(/  ["|']jcr:baseVersion["|']:.*\n/gi, "")
        .replace(/  ["|']jcr:isCheckedOut["|']:.*\n/gi, "")
        .replace(/  ["|']jcr:versionHistory["|']:.*\n/gi, "")
        .replace(/  ["|']jcr:predecessors["|']:.*\n/gi, "")
        .replace(/  ["|']jcr:mixinTypes["|']:.*\n/gi, "")
        .replace(/  ["|']mgnl:lastActivated["|']:.*\n/gi, "")
        .replace(/  ["|']mgnl:lastActivatedBy["|']:.*\n/gi, "")
        .replace(/  ["|']mgnl:lastActivatedVersion["|']:.*\n/gi, "")
        .replace(/  ["|']mgnl:lastActivatedVersionCreated["|']:.*\n/gi, "");

      editor.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(fileContent.length)
          ),
          newFileContent
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
