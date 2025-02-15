package courses

import (
	dto "backend/dto/comments"
	"backend/middleware"
	service "backend/services/comments"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func CreateComment(context *gin.Context) {
	var commentRequest dto.CommentDto
	idUser, _ := middleware.GetUserIdByToken(context)
	commentRequest.UserID = idUser
	context.BindJSON(&commentRequest)

	log.Info(commentRequest)
	response, err := service.CreateComment(commentRequest)
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusCreated, response)
}

func DeleteComment(context *gin.Context) {
	idComment, err := strconv.Atoi(context.Param("idComment"))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid idComment"})
		return
	}
	response := service.DeleteComment(idComment)
	if response != nil {
		context.JSON(response.Status(), response)
		return
	}
	context.JSON(http.StatusOK, response)
}

func GetCommentsByCourse(context *gin.Context) {
	idCourse, err := strconv.Atoi(context.Param("idCourse"))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid idCourse"})
		return
	}
	response, err2 := service.GetCommentsByCourse(idCourse)
	if err2 != nil {
		context.JSON(err2.Status(), err2)
		return
	}
	context.JSON(http.StatusOK, response)
}
