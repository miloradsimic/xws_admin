import { Injectable } from '@angular/core';
import { Comment } from '../domain/comment';
import { User } from '../domain/user';
import { CommentApprovalState } from '../domain/comment-approval-state.enum';
import { Accommodation } from '../domain/accommodation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private client: HttpClient) {
  }

  public getUnapprovedComments(): Observable<Comment[]> {
    return this.client.get<Comment[]>("/backend/comment/comments_for_approval");
  }

  public approve(id: number): Observable<boolean> {
    return this.client.get<boolean>(`/backend/comment/approve/${id}`);
  }

  public disapprove(id: number): Observable<boolean> {
    return this.client.get<boolean>(`/backend/comment/disapprove/${id}`);
  }

}
