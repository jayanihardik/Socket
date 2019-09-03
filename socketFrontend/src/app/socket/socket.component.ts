import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
})
export class SocketComponent implements OnInit {

  form: FormGroup;
  data = [];

  constructor(private fb: FormBuilder, private socket: Socket) {
    this.form = this.fb.group({
      Message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.socket
      .fromEvent('message')
      .subscribe(msg => {
        this.data.push(msg);
      });
  }

  submit(obj) {
    const Message = obj.Message;
    this.socket.emit('message', Message);
  }

}
