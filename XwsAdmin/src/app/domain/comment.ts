import { User } from "./user";
import { CommentApprovalState } from "./comment-approval-state.enum";
import { Accommodation } from "./accommodation";

export class Comment {
    id?: number;
    time?: Date;
    approvalState?: CommentApprovalState;
    text?: string;
    user?: User;
    accommodation?: Accommodation
}
