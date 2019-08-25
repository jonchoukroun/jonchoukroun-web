import Component from '@ember/component';
import { classNames } from '@ember-decorators/component';

@classNames('window elevate-2')
export default class AppWindowComponent extends Component {

  didInsertElement() {
    super.didInsertElement();

    this.$().focus();
    this.$('.window-header').removeClass('top-window');
    this.$('.window-header').addClass('top-window');
  }
}
