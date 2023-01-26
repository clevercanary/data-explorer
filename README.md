# data-explorer

## Developing alongside cc-data-browser
- Clone this repository into the same parent folder as cc-data-browser
- In cc-data-browser/explorer, run `npm link ../../data-explorer`, which will create a symlink to data-explorer in node_modules
    - If any packages are later installed or uninstalled, the symlink will need to be created again, which can be done with the same command or by running `npm link @clevercanary/data-explorer`
- `npx tsc` will need to be run when this is first downloaded and when any changes are made; one way this can be done more efficiently is by [setting the default build task](https://code.visualstudio.com/docs/typescript/typescript-compiling#_step-3-make-the-typescript-build-the-default) in VS Code so that it can be done with a keyboard shortcut