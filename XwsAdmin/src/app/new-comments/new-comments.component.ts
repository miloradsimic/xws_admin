import { Comment } from '../domain/comment';
import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../services/comment-service.service';
import { CommentApprovalState } from '../domain/comment-approval-state.enum';

@Component({
  selector: 'app-new-comments',
  templateUrl: './new-comments.component.html',
  styleUrls: ['./new-comments.component.css']
})
export class NewCommentsComponent implements OnInit {

  selectedComment: Comment;
  unapprovedComments: Comment[];

  constructor(private commentService: CommentServiceService) { }

  ngOnInit() {
    this.selectedComment = null;
    this.unapprovedComments = this.commentService.getUnapprovedComments();
  }

  public approve(comment: Comment) {
    this.setCommentApprovalState(comment, CommentApprovalState.Approved);
  }

  public disapprove(comment: Comment) {
    this.setCommentApprovalState(comment, CommentApprovalState.Unapproved);
  }

  private setCommentApprovalState(comment: Comment, approvalState: CommentApprovalState) {
    let modifiedComment = this.commentService.setApprovalState(comment, approvalState);
    if(modifiedComment.approvalState != CommentApprovalState.WaitingForApproval) {
      let oldCommentIndex = this.unapprovedComments.indexOf(comment);
      this.unapprovedComments.splice(oldCommentIndex, 1);
      let length = this.unapprovedComments.length;
      if(length > 0) {
        if(oldCommentIndex < 0) {
          this.selectedComment = this.unapprovedComments[0];
        }
        else if(oldCommentIndex >= length) {
          this.selectedComment = this.unapprovedComments[length - 1]
        }
        else {
          this.selectedComment = this.unapprovedComments[oldCommentIndex]
        }
      }
      else {
        this.selectedComment = null;
      }
    }
  }

}
