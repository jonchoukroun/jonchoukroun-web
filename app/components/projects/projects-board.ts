import Component from '@ember/component';

export default class ProjectsBoardComponent extends Component {

  projects!: any;

  cardX: number = 0;
  cardY: number = 0;
  cardId: number = 0;

  dragOver(e: any) {
    e.preventDefault();
    this.$().addClass('dragged-over');
  }

  drop(e: any) {
    const cardId = e.dataTransfer.getData('text');
    this.set('cardId', cardId);

    this.$(`#${cardId}`).removeClass('is-dragging');
    this.$().removeClass('dragged-over');

    const xy = e.dataTransfer.getData('position').split(',');
    this.set('cardX', e.clientX + parseInt(xy[0]));
    this.set('cardY', e.clientY + parseInt(xy[1]));
  }

}
