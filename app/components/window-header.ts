import Component from '@ember/component';
import {
  action,
  computed
} from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

@classNames('window-header')

export default class WindowHeaderComponent extends Component{

  windowId!: string;
  cardBodyId!: string;
  windowTitle!: string;
  icon!: string;

  showMinimizeButton!: boolean;
  showCloseButton!: boolean;

  @computed('icon')
  get iconSource() {
    return `/assets/icons/${this.icon}.png`;
  }

  @computed('icon')
  get iconAlt() {
    return `${this.icon} icon`;
  }

  @action
  closeWindow() {
    $(`#${this.windowId}`).addClass('d-none');
  }
}
