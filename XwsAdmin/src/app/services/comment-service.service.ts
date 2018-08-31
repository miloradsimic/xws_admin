import { Injectable } from '@angular/core';
import { Comment } from '../domain/comment';
import { User } from '../domain/user';
import { CommentApprovalState } from '../domain/comment-approval-state.enum';
import { Accommodation } from '../domain/accommodation';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private unapprovedComments: Comment[];

  constructor() {
    let author: User = {
      email: "komentarko@mail.com",
      name: "Komentarko Komentarisic",
      address: "Adresa XYZ",
      role: "User",
      active: true
    };
    let accommodation: Accommodation = {
      address: "Location A"
    };
    this.unapprovedComments = [
      {
        time: new Date(),
        text: "Some example text. Some example text. Some example text. \
        Some example text. Some example text. Some example text. Some example text.\
        Some example text. Some example text. Some example text. Some example text.\
        Some example text. Some example text.",
        user: author,
        approvalState: CommentApprovalState.WaitingForApproval,
        accommodation: accommodation
      },
      {
        time: new Date(),
        text: "Ima nesto novo. Ima nesto novo. Ima nesto novo. Ima nesto novo. \
        Ima nesto novo. Ima nesto novo. ",
        user: author,
        approvalState: CommentApprovalState.WaitingForApproval,
        accommodation: accommodation
      },
      {
        time: new Date(),
        text: "Lorem ipsum sunt autem. Lorem ipsum sunt autem. Lorem ipsum sunt autem. \
        Lorem ipsum sunt autem. Lorem ipsum sunt autem. Lorem ipsum sunt autem. \
        Lorem ipsum sunt autem. Lorem ipsum sunt autem.  ",
        user: author,
        approvalState: CommentApprovalState.WaitingForApproval,
        accommodation: accommodation
      }
    ];
  }

  public getUnapprovedComments(): Comment[] {
    return this.unapprovedComments;
  }

  public setApprovalState(comment: Comment, approvalState: CommentApprovalState): Comment {
    return {
      user: comment.user,
      time: comment.time,
      text: comment.text,
      approvalState: approvalState
    };
  }

}
