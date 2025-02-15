package dto

type CommentDto struct {
	UserID          int `json:"id_user"`
	CourseID        int `json:"id_course"`
	CommentID      int `json:"id"`
	Text            string `json:"text"`
	CreatedAt       string `json:"created_at"`
}

type CommentsDto []CommentDto
