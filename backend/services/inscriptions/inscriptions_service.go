package inscriptions

import (
	client "backend/clients/inscriptions"
	dto "backend/dto/inscriptions"
	e "backend/errors"
	model "backend/models"
)

func UserInscription(request dto.InscriptionDto) (dto.InscriptionDto, e.ApiError) {
	var inscription model.Inscription
	inscription.UserID = request.UserID
	inscription.CourseID = request.CourseID

	inscription, err := client.UserInscription(inscription)
	if err != nil {
		return request, e.NewBadRequestApiError("Error al inscribirse")
	}

	request.InscriptionID = inscription.InscriptionID

	return request, nil
}
