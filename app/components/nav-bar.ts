import Component from '@ember/component';
import { attribute } from '@ember-decorators/component';

export default class NavBarComponent extends Component {

  @attribute 'draggable' = false;

  baseIconUrl = 'https://s3-us-west-1.amazonaws.com/jonchoukroun.com/icons';
}
