import Component from '@ember/component';
import { attribute } from '@ember-decorators/component';

export default class NavBarComponent extends Component {
  @attribute 'draggable' = false;
}
