import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class HomeController extends Controller {

  @action
  redirectToGithub() {
    window.location.replace('https://github.com/jonchoukroun');
  }

}
