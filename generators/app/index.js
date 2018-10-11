'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the lovely ${chalk.red('generator-my-vue-element')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名称(vue-element):',
        default: 'vue-element'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.log('项目名称', props.name);
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your generator must be inside a folder named ${
          this.props.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    // Const basePath = `./${this.props.name}`;
    this.fs.copy(this.templatePath('./'), this.destinationPath('./'));
    this.fs.copy(this.templatePath('./.*'), this.destinationPath('./'));
    // This.fs.copy(this.templatePath('./.vscode'), this.destinationPath('./.vscode'));
    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json'),
      { name: this.props.name }
    );
    this.fs.copyTpl(this.templatePath('./.env'), this.destinationPath('./.env'), {
      name: this.props.name
    });
  }

  install() {
    this.installDependencies({ yarn: true, npm: false, bower: false });
  }
};
