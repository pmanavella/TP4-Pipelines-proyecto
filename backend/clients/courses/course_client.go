package courses

import (
	"backend/models"

	e "backend/errors"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func CreateCourse(course models.Course) (models.Course, e.ApiError) {
	result := Db.Create(&course)
	if result.Error != nil {
		log.Error("Error al crear el curso")
		log.Error(result.Error)
		return course, e.NewBadRequestApiError("Error al crear curso")
	}
	log.Info("Curso creado con exito")
	return course, nil
}

func UpdateCourse(course models.Course) (models.Course, e.ApiError) {
	result := Db.Model(&course).Where("id_course = ?", course.Id_course).Updates(models.Course{Name: course.Name, Description: course.Description})
	if result.Error != nil {
		log.Error("Error al actualizar el curso")
		log.Error(result.Error)
		return course, e.NewBadRequestApiError("Error al actualizar curso")
	}

	return course, nil
}

func DeleteCourse(idCurso int) error {
	err := Db.Where("id_course = ?", idCurso).Delete(&models.Course{}).Error
	if err != nil {
		log.Error("Error al eliminar el curso: ", err)
		return err
	}

	var inscriptions []models.Inscription
	err = Db.Where("course_id = ?", idCurso).Find(&inscriptions).Error
	if err != nil {
		log.Error("Error al buscar las inscripciones del curso: ", err)
		return err
	}
	for _, inscription := range inscriptions {
		err = Db.Delete(&inscription).Error
		if err != nil {
			log.Error("Error al eliminar la inscripción: ", err)
			return err
		}
	}

	return nil
}

func GetCoursesByUser(idUser int) ([]models.Course, e.ApiError) {
	var courses []models.Course
	result := Db.Table("courses").Select("courses.*").Joins("JOIN inscriptions ON courses.id_course = inscriptions.course_id").Where("inscriptions.user_id = ?", idUser).Find(&courses)
	if result.Error != nil {
		log.Error("Error al buscar los cursos")
		log.Error(result.Error)
		return courses, e.NewBadRequestApiError("Error al buscar cursos")
	}
	return courses, nil
}

func GetCourses() ([]models.Course, e.ApiError) {
	var courses []models.Course
	result := Db.Table("courses").Select("courses.*").Find(&courses)
	if result.Error != nil {
		log.Error("Error al buscar los cursos")
		log.Error(result.Error)
		return courses, e.NewBadRequestApiError("Error al buscar cursos")
	}
	return courses, nil
}

func GetCourseById(idCourse int) (models.Course, e.ApiError) {
    var course models.Course
    result := Db.Table("courses").Select("courses.*").Where("id_course = ?", idCourse).Find(&course)
    if result.Error != nil {
        log.Error("Error al buscar el curso")
        log.Error(result.Error)
        return course, e.NewBadRequestApiError("Error al buscar curso")
    }
    return course, nil
}