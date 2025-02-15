package dto

type InscriptionDto struct {
	UserID        int `json:"id_user"`
	CourseID      int `json:"id_course"`
	InscriptionID int `json:"id"`
}

type InscriptionsDto []InscriptionDto
