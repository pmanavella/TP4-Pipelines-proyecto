package models

type Inscription struct {
	UserID        int `gorm:"not null"`
	CourseID      int `gorm:"not null"`
	InscriptionID int `gorm:"primaryKey;autoIncrement;not null"`
}

type Inscriptions []Inscription
