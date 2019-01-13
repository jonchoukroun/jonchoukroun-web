import Route from '@ember/routing/route';
import { projects } from 'jonchoukroun-web/fixtures/project-data';

export default class ProjectsRoute extends Route {

  model() {
    return projects;
  }
}
