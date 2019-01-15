import Component from '@ember/component';

export default class ProjectsBoardComponent extends Component {

  projects!: any;

  cardX: number = 0;
  cardY: number = 0;
  cardId: number = 0;
  windowWidth: number = 0;

  didInsertElement() {
    super.didInsertElement();

    this.arrangeCards();
  }

  arrangeCards() {
    const cards = this.$('.draggable-card').get();

    let topCounter: number = 100;
    let leftCounter: number = 150;
    cards.map(c => {
      let el = this.$(c);

      if (window.innerWidth > 768) {
        el.css('left', leftCounter);
        el.css('top', topCounter);

        leftCounter += 100;
        topCounter += 100;
      } else {
        const cardHeight: number = this.$('.draggable-card').height() || 10;
        el.css('left', 40);
        el.css('top', topCounter);

        topCounter += (cardHeight + 20);
      }
    });

    this.setPriorities();
  }

  setPriorities() {
    const cards = this.$('.draggable-card').get();
    let zCounter: number = 1;

    cards.map(c => {
      let el = this.$(c);
      el.addClass(`elevate-${zCounter}`)
      zCounter += 1;

      if (zCounter === cards.length + 1) {
        el.find('.window-header').addClass('top-window');
      }
    })
  }

  resetPriorities(cardId: string): void {
    const cards = this.$('.draggable-card').get();

    let movedCard = this.$(`#${cardId}`);
    movedCard.removeClass((_idx: number, className: string) => {
      return (className.match(/(^|\s)elevate-\S+/g) || []).join(' ');
    });

    movedCard.addClass(`elevate-${cards.length}`);
    movedCard.find('.window-header').addClass('top-window');

    // Prevent multiple cards from being at lowest priority
    let lowestCount = 0;
    cards.map(c => {
      let el = this.$(c);

      if (c.id === cardId) { return; }

      let headerEl = el.find('.window-header');
      headerEl[0].classList.remove('top-window');

      if (c.classList.contains('elevate-1')) {
        if (lowestCount === 0)
          lowestCount += 1;
        else {
          el.removeClass('elevate-1');
          el.addClass('elevate-2');
        }

        return;
      }

      let zClass = c.className.split(' ').find(i => i.startsWith('elevate'));
      if (!zClass) { return; }

      let zIdx = parseInt(zClass.split('-')[1]);
      if (zIdx === 2 && lowestCount === 1) { return; }
      el.removeClass(zClass);
      el.addClass(`elevate-${zIdx - 1}`);
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

    this.resetPriorities(cardId);
  }

}
