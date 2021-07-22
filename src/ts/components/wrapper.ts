import { Container } from './container';
import { Control } from './controls';
import { Navigation } from './navigation';
import { WinnerContainer } from './winner_page/winner_container';

export class Wrapper extends Control {
  navigation: Navigation;
  container!: Container;
  winnerContainer: WinnerContainer;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'wrapper';

    this.navigation = new Navigation(this.element);
    this.container = new Container(this.element);
    this.winnerContainer = new WinnerContainer(this.element);
    this.winnerContainer.element.remove();
  }
}
