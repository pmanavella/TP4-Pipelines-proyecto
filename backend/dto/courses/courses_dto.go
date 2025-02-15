package dto

type CourseDto struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type CoursesDto []CourseDto
