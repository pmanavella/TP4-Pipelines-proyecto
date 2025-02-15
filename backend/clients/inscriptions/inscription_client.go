package inscriptions

import (
	"backend/models"

	e "backend/errors"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func UserInscription(inscription models.Inscription) (models.Inscription, e.ApiError) {
	inscriptionExists := Db.Where("user_id = ? AND course_id = ?", inscription.UserID, inscription.CourseID).First(&inscription)
	if inscriptionExists.Error == nil {
		log.Error("Ya estabas inscripto")
		return inscription, e.NewBadRequestApiError("Ya estabas inscripto")
	}
	result := Db.Create(&inscription)
	log.Info("Inscripto con exito")
	if result.Error != nil {
		log.Error("Error al inscribirse")
		log.Error(result.Error)
		return inscription, e.NewBadRequestApiError("Error al inscribirse")
	}

	return inscription, nil
}
