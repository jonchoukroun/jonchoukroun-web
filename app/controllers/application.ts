import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import {
  bind,
  later
} from '@ember/runloop';
import { service } from '@ember-decorators/service';

export default class ApplicationController extends Controller {

  @service keyManager: any;

  homeLinkMacro = this.setLinkMacro('home', 'h');
  githubLinkMacro = this.setLinkMacro('github', 'g');
  projectsLinkMacro = this.setLinkMacro('projects', 'p');
  aboutLinkMacro = this.setLinkMacro('about', 'a');

  setLinkMacro(link: string, key: string) {
    let actionName: string;
    if (link === 'github') {
      actionName = `executeGithubLink`;
    } else {
      actionName = 'executeLocalLink';
    }

    return this.get('keyManager').addMacro({
      callback: bind(this, () => {
        this.send(actionName, link);
      }),
      modifierKeys: ['Shift'],
      executionKey: key,
      keyEvent: 'keydown'
    })
  }

  @action
  executeLocalLink(routeName: string) {
    this.transitionToRoute(routeName);
  }

  @action
  executeGithubLink(/* link */) {
    // const el = <HTMLElement> document.getElementById('github-link');
    // el.focus();

    later(() => {
      window.open('https://github.com/jonchoukroun', '_blank');
      // el.blur();
    }, 500);
  }

  // @action
  // executeProjectsLink() {
  //   const el = <HTMLElement> document.getElementById('projects-link');
  //   el.focus();
  //
  //   later(() => {
  //     this.transitionToRoute('projects');
  //     el.blur();
  //   }, 500);
  // }
}
