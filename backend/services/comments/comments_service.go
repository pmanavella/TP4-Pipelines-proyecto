package courses

import (
	client "backend/clients/comments"
	dto "backend/dto/comments"
	e "backend/errors"
	model "backend/models"
	"time"
)

func CreateComment(request dto.CommentDto) (dto.CommentDto, e.ApiError) {

    comment := model.Comment{
        UserID:   request.UserID,
        CourseID: request.CourseID,
        Text:     request.Text,
    }
    comment.CreatedAt = time.Now().Format("2006-01-02 15:04:05")

    comment, err := client.CreateComment(comment)
    if err != nil {
        return dto.CommentDto{}, e.NewBadRequestApiError("Error al crear comentario")
    }

    return dto.CommentDto{
        CommentID:      comment.CommentID,
        UserID:  comment.UserID,
        CourseID: comment.CourseID,
        Text:    comment.Text,
        CreatedAt: comment.CreatedAt,
    }, nil
}

func DeleteComment(idComment int) e.ApiError {
    err := client.DeleteComment(idComment)
    if err != nil {
        return e.NewBadRequestApiError("Error al eliminar comentario")
    }

    return nil
}

func GetCommentsByCourse(idCourse int) ([]dto.CommentDto, e.ApiError) {
    comments, err := client.GetCommentsByCourse(idCourse)
    if err != nil {
        return nil, e.NewBadRequestApiError("Error al buscar comentarios")
    }

    var commentsDto []dto.CommentDto
    for _, comment := range comments {
        commentsDto = append(commentsDto, dto.CommentDto{
            CommentID:      comment.CommentID,
            UserID:  comment.UserID,
            CourseID: comment.CourseID,
            Text:    comment.Text,
            CreatedAt: comment.CreatedAt,
        })
    }

    return commentsDto, nil
}