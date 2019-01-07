import Component from '@ember/component';
import { attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

export default class ProjectCardComponent extends Component {

  project!: any;
  priority!: Number;

  @attribute 'draggable' = true;

  @computed('project.name')
  get cardId() {
    let arr: [String] = this.project.name.split(' ');
    return `${arr.join('-')}-card`;
  }

}
