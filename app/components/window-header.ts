import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

@classNames('window-header')

export default class WindowHeaderComponent extends Component{

  windowId!: string;
  cardBodyId!: string;
  windowTitle!: string;

  showMinimizeButton!: boolean;
  showCloseButton!: boolean;

  @action
  closeWindow() {
    $(`#${this.windowId}`).addClass('d-none');
  }
}
