package courses

import (
	client "backend/clients/courses"
	dto "backend/dto/courses"
	e "backend/errors"
	model "backend/models"
)

func CreateCourse(request dto.CourseDto) (dto.CourseDto, e.ApiError) {
	var course model.Course

	course.Name = request.Name
	course.Description = request.Description

	course, err := client.CreateCourse(course)
	if err != nil {
		return request, err
	}

	request.ID = course.Id_course

	return request, nil
}

func UpdateCourse(request dto.CourseDto) (dto.CourseDto, e.ApiError) {
	var course model.Course

	course.Id_course = request.ID
	course.Name = request.Name
	course.Description = request.Description

	course, err := client.UpdateCourse(course)
	if err != nil {
		return request, e.NewBadRequestApiError("Error al actualizar curso")
	}

	return request, nil
}

func DeleteCourse(idCourse int) e.ApiError {
	err := client.DeleteCourse(idCourse)
	if err != nil {
		return e.NewBadRequestApiError("Error al eliminar curso")
	}

	return nil
}

func GetCoursesByUser(idUser int) ([]dto.CourseDto, e.ApiError) {
	var courses []model.Course

	courses, err := client.GetCoursesByUser(idUser)
	if err != nil {
		return nil, e.NewBadRequestApiError("Error al buscar cursos")
	}

	var coursesDto []dto.CourseDto
	for _, course := range courses {
		coursesDto = append(coursesDto, dto.CourseDto{
			ID:          course.Id_course,
			Name:        course.Name,
			Description: course.Description,
		})
	}

	return coursesDto, nil
}


func GetCourseById(idCourse int) (dto.CourseDto, e.ApiError) {
	var course model.Course

	course, err := client.GetCourseById(idCourse)
	if err != nil {
		return dto.CourseDto{}, e.NewBadRequestApiError("Error al buscar cursos")
	}

	var courseDto dto.CourseDto
	courseDto.ID=  course.Id_course
	courseDto.Name= course.Name
	courseDto.Description= course.Description


	return courseDto, nil
}


func GetCourses() ([]dto.CourseDto, e.ApiError) {
	var courses []model.Course

	courses, err := client.GetCourses()
	if err != nil {
		return nil, e.NewBadRequestApiError("Error al buscar cursos")
	}

	var coursesDto []dto.CourseDto
	for _, course := range courses {
		coursesDto = append(coursesDto, dto.CourseDto{
			ID:          course.Id_course,
			Name:        course.Name,
			Description: course.Description,
		})
	}

	return coursesDto, nil
}
