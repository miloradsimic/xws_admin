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
    let component = this;
    this.selectedComment = null;
    this.commentService.getUnapprovedComments().subscribe(
      (comments) => {
        component.unapprovedComments = comments;
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  public approve(id: number) {
    let component = this;
    this.commentService.approve(id).subscribe(
      (approvedState) => {
        component.handleApproval(id);
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  public disapprove(id: number) {
    let component = this;
    this.commentService.disapprove(id).subscribe(
      (comments) => {
        component.handleApproval(id);
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  private handleApproval(id: number) {
    let oldCommentIndex = this.unapprovedComments.findIndex(
      (item) => {
        return item.id == id;
      });
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
