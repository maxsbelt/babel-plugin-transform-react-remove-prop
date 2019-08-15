# Contributing

Contributions are always welcome, no matter how large or small.

## Developing setup

#### Node

Install [nodenv](https://github.com/nodenv/nodenv) and add append initializer in `.bash_profile`:

```bash
$ brew install nodenv
$ eval "$(nodenv init -)" # add it to .bash_profile
```

Install latest lts Node.js version:

```bash
ndenv install 10.16.0
ndenv global 10.16.0
```

#### Linter

To maintain consistent code style we're using [eslint](https://eslint.org/) with [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) config + some tweaks. We have a pre-commit hook that runs the linter but it's better to install plugin for your IDE/text editor to get immediate feedback about code style problems.

#### Editor config

In order to prevent some problems in source files related to different platforms we're using [`.editorconfig` file](https://editorconfig.org/). Please install plugin for your IDE/text editor.
