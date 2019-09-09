import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'chat-config',
  template: `
 <div class='bg'>
 <div id='img-bg'>
 <div style='height:1000px'>
 kngjnfkj
 </div>
 </div>
 </div>
  `,
  styles: [`
.bg {
    background-image: url('https://d2b8lqy494c4mo.cloudfront.net/mss/images/career/career.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    height: fit-content !important;
    /* height: 100%; */
}

#img-bg {
    background: rgba(0, 0, 0, 0.7);
    height: 100% !important;
    width: 100%;
    margin-top: 0px;
    position: relative;
}
  `],
})
export class ChatConfigComponent {
  @Input() public theme: string
  @Input() public text = 'Select theme'
  @Output() public themeChange: EventEmitter<any> = new EventEmitter()

  public themes = ['blue', 'grey', 'red']
  public setTheme(theme) {
    this.theme = theme
    this.themeChange.emit(this.theme)
  }
}
