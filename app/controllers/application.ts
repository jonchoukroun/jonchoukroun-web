import Controller from '@ember/controller';
import { bind } from '@ember/runloop';
import { service } from '@ember-decorators/service';

export default class ApplicationController extends Controller {

  @service keyManager: any;

  homeLinkMacro = this.setLinkMacro('home', 'h');
  projectsLinkMacro = this.setLinkMacro('projects', 'p');
  aboutLinkMacro = this.setLinkMacro('about', 'a');
  blogLinkMacro = this.setLinkMacro('blog', 'b');
  settingsLinkMacro = this.setLinkMacro('settings', 's');

  setLinkMacro(link: string, key: string) {
    return this.keyManager.addMacro({
      callback: bind(this, () => {
        this.executeLocalLink(link);
      }),
      modifierKeys: ['Shift'],
      executionKey: key,
      keyEvent: 'keydown',
      priority: 0
    });
  }

  executeLocalLink(routeName: string) {
    this.transitionToRoute(routeName);
  }

  willDestroy() {
    super.willDestroy();

    this.keyManager.removeMacro(this.homeLinkMacro);
    this.keyManager.removeMacro(this.projectsLinkMacro);
    this.keyManager.removeMacro(this.aboutLinkMacro);
    this.keyManager.removeMacro(this.settingsLinkMacro);
  }
}
