import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import {
  bind,
  later
} from '@ember/runloop';
import { classNames } from '@ember-decorators/component';
import { service } from '@ember-decorators/service';

@classNames('window elevate-2')
export default class WelcomeWindowComponent extends Component {

  @service keyManager: any;

  sendProjectsRedirect!: any;
  githubLinkMacro = this.setLinkMacro('github');
  projectsLinkMacro = this.setLinkMacro('projects');

  didInsertElement() {
    super.didInsertElement();

    this.$().focus();
    this.$('.window-header').removeClass('top-window');
    this.$('.window-header').addClass('top-window');
  }

  willDestroyElement() {
    super.willDestroyElement();

    this.keyManager.removeMacro(this.githubLinkMacro);
    this.keyManager.removeMacro(this.projectsLinkMacro);
  }

  setLinkMacro(link: string) {
    let actionName: string;
    let key: string = link.split('')[0];
    if (link === 'github') {
      actionName = 'executeGithubLink';
    } else {
      actionName = 'executeProjectsLink';
    }

    return this.keyManager.addMacro({
      callback: bind(this, () => {
        this.send(actionName);
      }),
      modifierKeys: ['Shift'],
      executionKey: key,
      keyEvent: 'keydown',
      priority: 1
    });
  }

  @action
  executeGithubLink() {
    const el = this.$('#github-link');
    el.focus();

    later(() => {
      window.open('https://github.com/jonchoukroun', '_blank');
      el.blur();
    }, 200);
  }

  @action
  executeProjectsLink() {
    const el = this.$('#projects-link');
    el.focus();

    later(() => {
      this.get('sendProjectsRedirect')();
      el.blur();
    }, 200);
  }
}
