import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ChatMessage } from 'src/app/model/chatMessage.model';
import { WebSocketService } from 'src/app/service/web-socket-service.service';

@Component({
  selector: 'app-chat-ting',
  templateUrl: './chat-ting.component.html',
  styleUrls: ['./chat-ting.component.css']
})
export class ChatTingComponent implements OnInit {

  @ViewChild('messages') private messagesContainer!:ElementRef;
  @ViewChild('notificationSound') private notificationSound!  : ElementRef;

  messageInput: string = '';
  id: string="";
  messageList: any[] = [];
  romId:string = '';
  isPopupOpen: boolean = true;


  constructor(private chatService: WebSocketService,
    private route: ActivatedRoute , private toadstr : ToastrService
    ){

  }

  ngOnInit(): void {
   //this.id = String(AuthDetail.getLoginedInfo()?.id);
    //this.chatService.joinRoom(this.romId);
    this.lisenerMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }



  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.id
    }as ChatMessage
    this.chatService.sendMessage(this.romId, chatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      // Lấy tin nhắn mới nhất từ server
      const newMessages = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.id ? 'sender' : 'receiver'
      }));

      // Kiểm tra nếu tin nhắn mới nhất là từ người khác
      if (newMessages.length > this.messageList.length) {
        const latestMessage = newMessages[newMessages.length - 1];
        if (latestMessage.message_side === 'receiver') {
          this.playNotificationSound(); // Phát âm thanh nếu là tin nhắn từ người khác
        }
      }

      this.messageList = newMessages;
      this.scrollToBottom(); // Cuộn xuống sau khi cập nhật tin nhắn
    });
  }
  closePopup():void{
    this.chatService.leaveRoom(); // Optional: leave previous room if necessary
    this.chatService.joinRoom(this.romId); // Join new room


    if(ValidationUtil.isNotNullAndNotEmpty(this.id)){
      this.isPopupOpen = false;
    }else{
      this.toadstr.warning("please enter the name")
    }

  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom', err);
    }
  }

  private playNotificationSound(): void {
    try {
      this.notificationSound.nativeElement.play();
    } catch (err) {
      console.error('Could not play notification sound', err);
    }
  }

}
