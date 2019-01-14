import Component from '@ember/component';

export default class ProjectsBoardComponent extends Component {

  projects!: any;

  cardX: number = 0;
  cardY: number = 0;
  cardId: number = 0;

  didInsertElement() {
    super.didInsertElement();

    this.arrangeCards();
  }

  arrangeCards() {
    const boardDimensions: DOMRect | ClientRect = this.element.getBoundingClientRect();
    const boardWidth: number = boardDimensions.width;

    const cardWidth: number | undefined = this.$('.card').width();
    if (!cardWidth) { return; }

    if (Math.floor(boardWidth / cardWidth) >= 2) {
      const cards = this.$('.card').get();
      let counter: number = 0;
      cards.map(c => {
        this.$(c).css('left', counter);
        this.$(c).css('top', 150);
        counter += (cardWidth + 20);
      });
    }
  }

  adjustPriorities(cardId: string): void {
    const cards = this.$('.card').get();
    cards.map(c => {
      this.$(c).removeClass((_idx: number, className: string) => {
        return (className.match(/(^|\s)elevate-\S+/g) || []).join(' ');
      });
      
      if (c.id === cardId) {
        this.$(c).addClass('elevate-2');
      } else {
        this.$(c).addClass('elevate-1');
      }
    });
  }

  dragOver(e: any) {
    e.preventDefault();
    this.$().addClass('dragged-over');
  }

  drop(e: any) {
    const cardId = e.dataTransfer.getData('text');
    if (!cardId) { return; }

    this.set('cardId', cardId);

    this.$(`#${cardId}`).removeClass('is-dragging');
    this.$().removeClass('dragged-over');

    const xy = e.dataTransfer.getData('position').split(',');
    this.set('cardX', e.clientX + parseInt(xy[0]));
    this.set('cardY', e.clientY + parseInt(xy[1]));

    this.adjustPriorities(cardId);
  }

}
