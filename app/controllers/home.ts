import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class HomeController extends Controller {

  @action
  redirectToGithub() {
    window.open('https://github.com/jonchoukroun', '_blank');
  }

  @action
  redirectToProjects() {
    this.transitionToRoute('projects');
  }

}
