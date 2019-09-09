import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  public url = 'https://mss4507-delightful-numbat.eu-gb.mybluemix.net'
  public socket      
  constructor(private http: HttpClient) {
    this.socket = io(this.url)
    
    console.log(this.socket)
  }
 public  sendMessage(req, userid) {
    console.log(this.socket.id,"sent to "+userid)
    this.socket.emit('sendReq', req, userid)
  }
  public  endchat(userid,agent) {
    console.log(userid+" chat ended")
    this.socket.emit('end', userid,agent)
  }
  public  sendack(userid, sid,agent) {
    console.log(sid +' sendack')
    this.socket.emit('ack', userid, sid,agent)
  }
  public  getreq(req) {
    console.log(this.socket.id+'sendack')
    this.socket.emit('req', 'requests')
  }
  public  refresh() {
    console.log(this.socket.id+'refresh')
    this.socket.emit('refresh', this.socket.id)
  }
  public reqs = () => {
    return Observable.create((observer) => {
      this.socket.on('reqw', (reqs) => {        
        console.log('requests',reqs)
        observer.next(reqs) 
      })
    })
  }
  public  agentmsg(uid,msg) {
    console.log(this.socket.id+'sendack')
    this.socket.emit('agentmsg', uid,msg,"sent")
  }

  public acp = () => {
    return Observable.create((observer) => {
      this.socket.on('acp', (acp) => {
        console.log('accepted',acp)
        observer.next(acp)
      })
    })
  }
  

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message, fbuser ) => {
        console.log('message', message, fbuser)
        observer.next([fbuser, message ] )
      })
    })
  }
// public getrequest() {
//   return fetch('https://fafc91d6.ngrok.io/getrequests')
//         .then(function(response) {
//            return response.json()
//         }) .then(function(data) {
//                 console.log(data+'getrequest')
//                 return data

//             })
// }

  }


