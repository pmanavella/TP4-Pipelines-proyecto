package dto

type CourseDto struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Duration     string `json:"duration"`
	Instructor   string `json:"instructor"`
	Requirements string `json:"requirements"`
}

type CoursesDto []CourseDto
