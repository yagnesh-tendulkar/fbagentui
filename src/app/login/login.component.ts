import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, ElementRef, Pipe, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { HttpClient,  } from '@angular/common/http'
import { SocketsService } from '../sockets.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  log = false;
  status=false;
  data;
  err
  constructor(public route: Router,public service: SocketsService, public http: HttpClient) { 
    localStorage.clear()
  }
  emailFormControl = new FormControl('', [
    Validators.required,    
  ]);
  pwd = new FormControl('', [
    Validators.required,
  ]);
  onClickSubmit(v) {
    // localStorage.setItem("agent",this.emailFormControl.value)
    // this.route.navigateByUrl('/chat')
    console.log(this.emailFormControl.value,this.pwd.value)

    this.http.post("https://mss4507-delightful-numbat.eu-gb.mybluemix.net/login",{"username":this.emailFormControl.value,"pwd": this.pwd.value+''}).subscribe(res =>{
    this.data=res 
    console.log(this.data)     
     localStorage.setItem("agent","tummidi@Marketing")
     localStorage.setItem("log","ok")
     this.route.navigateByUrl('/chat')
  //   if(this.data.ResultString!= 'InValidCredentiales'){ 
  //   if (this.data.TitleTypeId == 'SEO/Social Media Expert') {
  //     this.route.navigateByUrl('/chat')
  //     // localStorage.setItem("agent",this.data.FName+' '+this.data.LName+'@'+this.data.TitleTypeId)
  //     localStorage.setItem("agent","agent")
  //     localStorage.setItem("log","ok")
  //   } else {
  //     this.log=true
  //     this.err="Sorry you don't have access.";
  //   }
  // }else{
  //   this.log=true
  //   this.err="Please enter valid credentials.";
  //   }
  })
   
  }
  ngOnInit(){
    // this.route.navigateByUrl('/chat')
  }
  

}
