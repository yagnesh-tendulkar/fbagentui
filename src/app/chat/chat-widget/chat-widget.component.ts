import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { fadeIn, fadeInOut } from '../animations';
import { SocketsService } from '../../sockets.service';
import * as io from 'socket.io-client';

const randomMessages = [
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'Is there anything else I can help you with?',
  'That\'s awesome',
  'Angular Elements is the bomb 💣 ',
  'Can you explain in more detail?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure to chat with you',
  'We are happy to make you a custom offer!',
  'Bye',
  ':)',
]

const rand = max => Math.floor(Math.random() * max)

const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  name = 'checked'
  // socket: SocketIOClient.Socket
  constructor(public service: SocketsService) {
    //this.socket = io.connect('https://7f2f7052.ngrok.io',{ transports: ['websocket'] });
  }
  @ViewChild('bottom',{static:false}) bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'

  public _visible = false

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator = {
    name: 'Operator',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  public randomMessage() {
    this.addMessage(this.operator, getRandomMessage(), 'received')
  }
 
  
  ngOnInit() {
this.addMessage(this.operator, getRandomMessage(), 'sent')
    this.addMessage(this.operator, getRandomMessage(), 'received')
    //retriving socket message from node server
    this.service.getMessages()
    .subscribe((message: string) => {
      // this.addMessage(this.operator, getRandomMessage(), 'received')
      console.log("message recived", message);
      // this.messages.push(message);
    });

    setTimeout(() => this.visible = true, 1000)
    // setTimeout(() => {
    //   this.socket.on('botSoc',function(data) {
    //      console.log("Socket Recive Data:",JSON.stringify(data));
    //    })

    //   // this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    // }, 1000)
  }
 fun() {
alert('chat ended')
// this.toggleChat()
//user disconnected
 }

  public toggleChat() {
    this.visible = !this.visible
  }

  // public sendMessage({ message }) {
  //   this.service.sendMessage('hai how you doing');
  //   if (message.trim() === '') {
  //     return
  //   }
  //   this.addMessage(this.client, message, 'sent')
  // }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}
