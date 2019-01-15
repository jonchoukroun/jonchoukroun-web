import Component from '@ember/component';
import {
  attribute,
  classNames
} from '@ember-decorators/component';
import {
  computed,
  observes
} from '@ember-decorators/object';

@classNames('window draggable-card')

export default class ProjectCardComponent extends Component {

  project!: any;
  priority!: number;

  movedCardId?: number;
  movedX?: number;
  movedY?: number;

  x: number = 0;
  y: number = 0;

  @attribute 'draggable' = true;

  didReceiveAttrs() {
    super.didReceiveAttrs();
    const id = this.elementId;
    const movedCardId = `${this.get('movedCardId')}`;
    const x = this.get('movedX');
    const y = this.get('movedY');

    if (movedCardId === id) {
      this.set('x', x);
      this.set('y', y);
    }
  }

  @computed('project.name')
  get cardBodyId() {
    let name = this.project.name.split(' ')
    name.push('body');
    return name.join('-');
  }

  @observes('x', 'y')
  positionChanged() {
    const x: number = this.get('x');
    const y: number = this.get('y');
    this.$().css('left', x);
    this.$().css('top', y);
  }

  dragStart(e: any) {
    this.$().addClass('is-dragging');
    this.$().removeClass((_idx: number, className: string) => {
      return (className.match(/(^|\s)elevate-\S+/g) || []).join(' ');
    });
    this.$().addClass('elevate-10');

    e.dataTransfer.setData('text', e.target.id);

    const x = this.$().position().left - e.clientX;
    const y = this.$().position().top - e.clientY;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('position', `${x},${y}`);
  }

  drop(e: any) {
    this.$('.project-card').removeClass('is-dragging');
    this.$().removeClass((_idx: number, className: string) => {
      return (className.match(/(^|\s)elevate-\S+/g) || []).join(' ');
    });
    this.$().addClass('elevate-2');

    const xy = e.dataTransfer.getData('position').split(',');
    this.set('x', e.clientX + parseInt(xy[0]));
    this.set('y', e.clientY + parseInt(xy[1]));
  }

}
