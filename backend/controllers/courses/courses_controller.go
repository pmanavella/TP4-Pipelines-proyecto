package courses

import (
	dto "backend/dto/courses"
	"backend/middleware"
	service "backend/services/courses"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateCourse(context *gin.Context) {
	var courseRequest dto.CourseDto
	context.BindJSON(&courseRequest)
	response, err := service.CreateCourse(courseRequest)
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusCreated, response)
}

func UpdateCourse(context *gin.Context) {
	var courseRequest dto.CourseDto
	context.BindJSON(&courseRequest)
	response, err := service.UpdateCourse(courseRequest)
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusOK, response)
}

func DeleteCourse(context *gin.Context) {
	idCourse, err := strconv.Atoi(context.Param("idCourse"))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid idCourse"})
		return
	}
	response := service.DeleteCourse(idCourse)
	if response != nil {
		context.JSON(response.Status(), response)
		return
	}
	context.JSON(http.StatusOK, response)
}

func GetCoursesByUser(context *gin.Context) {
	idUser, _ := middleware.GetUserIdByToken(context)
	response, err := service.GetCoursesByUser(idUser)
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusOK, response)
}

func GetCourses(context *gin.Context) {
	response, err := service.GetCourses()
	if err != nil {
		context.JSON(err.Status(), err)
		return
	}
	context.JSON(http.StatusOK, response)
}

func GetCourseById(context *gin.Context) {
    idCourse, err := strconv.Atoi(context.Param("idCourse"))
    if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid idCourse"})
        return
    }
	response, err2 := service.GetCourseById(idCourse)
	if err2 != nil {
		context.JSON(err2.Status(), err)
		return
	}
	context.JSON(http.StatusOK, response)
}
