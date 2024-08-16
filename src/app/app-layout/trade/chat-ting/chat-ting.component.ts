import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ChatMessage } from 'src/app/model/chatMessage.model';
import { WebSocketService } from 'src/app/service/web-socket-service.service';

@Component({
  selector: 'app-chat-ting',
  templateUrl: './chat-ting.component.html',
  styleUrls: ['./chat-ting.component.css']
})
export class ChatTingComponent implements OnInit {

  messageInput: string = '';
  id: string="";
  messageList: any[] = [];

  constructor(private chatService: WebSocketService,
    private route: ActivatedRoute
    ){

  }

  ngOnInit(): void {
    this.id = String(AuthDetail.getLoginedInfo()?.id);
    this.chatService.joinRoom("ABC");
    this.lisenerMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.id
    }as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.id ? 'sender': 'receiver'
      }))
    });
  }

}
