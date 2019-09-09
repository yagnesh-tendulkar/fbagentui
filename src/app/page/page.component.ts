import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Component, ElementRef, Pipe, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient,  } from '@angular/common/http'
import { SocketsService } from '../sockets.service'
import {NgxAutoScroll} from "ngx-auto-scroll";
import { HostListener } from "@angular/core";
import * as io from 'socket.io-client'
import { Router } from '@angular/router';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
encapsulation: ViewEncapsulation.None
@Input() public buttonText = '↩︎'
@Input() public focus = new EventEmitter()
@Output() public send = new EventEmitter()
@Output() public dismiss = new EventEmitter()
@ViewChild('message',{static: false}) message: ElementRef
@ViewChild('bottom',{static: false}) bottom: ElementRef
@HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {  
  this.service.refresh()
  event.returnValue = false;
  }
  

public focusMessage() {
  this.message.nativeElement.focus()
}

public getMessage() {
  return this.message.nativeElement.value
}

public clearMessage() {
  this.message.nativeElement.value = ''
}

onSubmit() {

  const message = this.getMessage()
  this.service.sendMessage(message, sessionStorage.getItem('id'))
  if (message.trim() === '') {
    return
  }
  this.send.emit({ message })
  this.service.agentmsg(sessionStorage.getItem('id'),message)
  this.addMessage('this.client', message, 'sent',new Date().getTime())
  this.clearMessage()
  this.focusMessage()
}
  
  constructor(public ap:AppComponent,public service: SocketsService, public http: HttpClient,public route:Router) {     
  }
persons = [
//   {
//   'id':'2172391996216421',
//   'messages':[{
//     'from':'agent',
//     'text':'hello how are you',
//     'type':'received',
//     'date':Date.now()
//   },{
//     'from':'user',
//     'text':'hello how are you',
//     'type':'sent',
//     'date':Date.now()
//   }],
//   'status':"none",
//   'first_name' :"Yagnesh",
//   'last_name':"Tendulkar",
//   'profile_pic':'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=2172391996216421&width=1024&ext=1564681963&hash=AeRfWOr1fdKI9_yF'
// }
  
]
agentStatus = false
userimg
fbuser
sid
agent=localStorage.getItem('agent').split('@')[0]
agentskill=localStorage.getItem('agent').split('@')[1]
display=false
psn=false
dname
dpic
public dat
public temp=[]
public messages = []
public addMessage(from, text, type: 'received' | 'sent',date) {
   
  this.scrollToBottom() 
  this.messages.push({
      from,
      text,
      type,
      date,
    })
    this.scrollToBottom()
   
  }
public scrollToBottom() {
  // this.ngxAutoScroll.forceScrollDown();  
  if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView({behavior: "auto", block: "end", inline: "end"})
    }
  }
userlog(data) {  
  sessionStorage.clear()
  this.display=true;
  data.status="Accepted"
  this.temp
  this.dname=data.first_name;
  this.dpic=data.profile_pic;
  this.service.sendack(data.id, this.sid,this.agent )
  sessionStorage.setItem('id',data.id)
  console.log(data)
  this.messages=data.messages
  this.http.post('https://mss4507-delightful-numbat.eu-gb.mybluemix.net/getrequests', { '_id' : data.id } ).subscribe(res => {
    console.log(res)
    this.dat = res
    this.messages = []
    console.log(this.dat.messages)
    console.log(this.dat)
    this.dat.messages.forEach(element => {
    this.addMessage('data.first_name', element.message, element.type,element.timestamp)
    })
  })
}


// public sendMessage({ message }) {
//   console.log(this.bottom)
// console.log(this.messages)
//     this.service.sendMessage(message, sessionStorage.getItem('id'))
//     if (message.trim() === '') {
//       return
//     }
//     this.service.agentmsg(sessionStorage.getItem('id'),message)
//     this.addMessage('this.client', message, 'sent',new Date().getTime())
//     // this.addMessage('this.client', message, 'received'  ,new Date().getTime())
//   }


end() {
  this.messages = []
  this.display=false
  this.persons = []
  console.log(sessionStorage.getItem('id'))
  this.service.endchat(sessionStorage.getItem('id'),this.agent)
   this.http.post('https://mss4507-delightful-numbat.eu-gb.mybluemix.net/update', { '_id' : sessionStorage.getItem('id'), 'status': 'none' } ).subscribe(res => {
    console.log("res")
  })
    sessionStorage.clear()
    this.messages = []
    this.dat=[]
}

off(){
  localStorage.clear();
  this.route.navigateByUrl('/')
}
ngOnInit() {  
  if (localStorage.getItem("log")!="ok") {
   console.log(localStorage.getItem("log"))
    this.route.navigateByUrl('/')
  }    
  sessionStorage.clear()
  if(this.persons.length==0){
    this.psn=true
  }
  this.agentStatus = true
  this.service.getreq('msg')
  this.service.reqs()
    .subscribe((reqs) => {
      this.sid = this.service.socket.id
      console.log(this.sid)
      this.persons = []
      reqs.forEach(element => {
      if ((element.skt === '' || element.skt === this.sid) &&  element.status !== 'none') {
        this.persons.push(element)
      }
      })
      console.log(this.persons)
    })
    this.service.acp()
    .subscribe((acp) => {
      console.log(acp, this.persons)
      console.log(this.persons.findIndex(x => x.id === acp))
    })

    this.service.getMessages()  
    .subscribe((message: string) => {
      console.log('getmessages')    
      console.log(message)
      if (message[0] === sessionStorage.getItem('id') ) {
      this.addMessage('me', message[1], 'received',new Date().getTime())
      }   
      console.log('message recived', message)
})

}

}

