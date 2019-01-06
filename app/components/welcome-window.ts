import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import {
  bind,
  later
} from '@ember/runloop';
import { service } from '@ember-decorators/service';

export default class WelcomeWindowComponent extends Component {

  @service keyManager:any;

  didInsertElement() {
    super.didInsertElement();
    this.$().focus();
  }

  githubLinkMacro = this.setGithubLinkMacro();
  projectsLinkMacro = this.setProjectsLinkMacro();

  setGithubLinkMacro() {
    return this.get('keyManager').addMacro({
      callback: bind(this, () => {
        this.send('executeGithubLink');
      }),
      modifierKeys: ['Shift'],
      executionKey: 'g',
      keyEvent: 'keydown'
    });
  }

  setProjectsLinkMacro() {
    return this.get('keyManager').addMacro({
      callback: bind(this, () => {
        this.send('executeProjectsLink');
      }),
      modifierKeys: ['Shift'],
      executionKey: 'p',
      keyEvent: 'keydown'
    });
  }

  willDestroyElement() {
    super.willDestroyElement();
    this.get('keyManager').removeMacro(this.githubLinkMacro);
  }

  @action
  executeGithubLink() {
    this.$('#github-link').focus();

    later(() => {
      // @ts-ignore
      this.get('sendGithubRedirect')();
      this.$('#github-link').blur();
    }, 500);
  }

  @action
  executeProjectsLink() {
    this.$('#projects-link').focus();

    later(() => {
      // @ts-ignore
      this.get('sendProjectsRedirect')();
      this.$('#project-link').blur();
    }, 500);
  }

}
