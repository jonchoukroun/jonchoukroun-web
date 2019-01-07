import Component from '@ember/component';
import { attribute } from '@ember-decorators/component';

export default class ProjectCardComponent extends Component {

  project!: Object;
  priority!: Number;

  @attribute 'draggable' = true;

}
