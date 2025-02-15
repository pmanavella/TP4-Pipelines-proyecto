package models

type Comment struct {
	UserID    int    `gorm:"not null"`
	CourseID  int    `gorm:"not null"`
	CommentID int    `gorm:"primaryKey;autoIncrement;not null"`
	Text      string `gorm:"type:varchar(100);not null"`
	CreatedAt string `gorm:"type:varchar(100);not null"`
}

type Comments []Comment
