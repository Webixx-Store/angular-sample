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
  userId: string="";
  messageList: any[] = [];

  constructor(private chatService: WebSocketService,
    private route: ActivatedRoute
    ){

  }

  ngOnInit(): void {
    this.userId = String(AuthDetail.getLoginedInfo()?.userId);
    this.chatService.joinRoom("ABC");
    this.lisenerMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    }as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver'
      }))
    });
  }

}
