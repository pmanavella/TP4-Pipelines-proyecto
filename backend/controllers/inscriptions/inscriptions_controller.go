package inscriptions

import (
	dtoInscription "backend/dto/inscriptions"
	middleware "backend/middleware"
	inscriptions "backend/services/inscriptions"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func UserInscription(context *gin.Context) {
	var inscriptionRequest dtoInscription.InscriptionDto
	idCourse, _ := strconv.Atoi(context.Param("idCourse"))
	idUser, _ := middleware.GetUserIdByToken(context)
	inscriptionRequest.CourseID = idCourse
	inscriptionRequest.UserID = idUser
	response, err := inscriptions.UserInscription(inscriptionRequest)
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusCreated, response)
}
