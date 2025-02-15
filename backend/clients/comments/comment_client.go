package comments

import (
	"backend/models"

	e "backend/errors"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func CreateComment(comment models.Comment) (models.Comment, e.ApiError) {
    result := Db.Create(&comment)
    if result.Error != nil {
        log.Error("Error al crear el comentario")
        log.Error(result.Error)
        return comment, e.NewBadRequestApiError("Error al crear comentario")
    }
    log.Info("Comentario creado con exito")
    return comment, nil
}

func DeleteComment(idComment int) error {
    err := Db.Where("comment_id = ?", idComment).Delete(&models.Comment{}).Error
    if err != nil {
        log.Error("Error al eliminar el comentario: ", err)
        return e.NewBadRequestApiError("Error al eliminar comentario")
    }

    return nil
}

func GetCommentsByCourse(idCourse int) ([]models.Comment, e.ApiError) {
    var comments models.Comments
    err := Db.Where("course_id = ?", idCourse).Find(&comments).Error
    if err != nil {
        log.Error("Error al buscar los comentarios del curso: ", err)
        return nil, e.NewBadRequestApiError("Error al buscar comentarios")
    }

    return comments, nil
}

