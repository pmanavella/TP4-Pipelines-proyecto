package models

type Course struct {
	Id_course    int    `gorm:"primaryKey;autoIncrement;not null"`
	Name         string `gorm:"type:varchar(100);not null"`
	Description  string `gorm:"type:varchar(100);not null"`
	Duration     string `gorm:"type:varchar(50);not null"`
	Instructor   string `gorm:"type:varchar(255);not null"`
	Requirements string `gorm:"type:varchar(255)"`
}

type Courses []Course
