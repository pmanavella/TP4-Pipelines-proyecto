package users

import (
	client "backend/clients/users"
	token "backend/dto/token"
	dto "backend/dto/users"
	e "backend/errors"
	model "backend/models"
	"crypto/md5"
	"encoding/hex"

	jwt "github.com/dgrijalva/jwt-go"
)

func RegisterUser(request dto.UserDto) (dto.UserDto, e.ApiError) {
	var user model.User

	user.Username = request.Username
	user.Password = request.Password

	hash := md5.New()
	hash.Write([]byte(request.Password))
	user.Password = hex.EncodeToString(hash.Sum(nil))

	user, err := client.RegisterUser(user)
	if err != nil {
		return request, e.NewBadRequestApiError("Error al registrar usuario")
	}
	request.ID = user.Id_user

	return request, nil
}

var jwtKey = []byte("secret_key")

func Login(request dto.UserDto) (token.TokenDto, e.ApiError) {
	var user, err = client.GetUser(request)
	var tokenDto token.TokenDto
	if err != nil {
		return tokenDto, e.NewBadRequestApiError("Usuario no encontrado")
	}
	var pswMd5 = md5.Sum([]byte(request.Password))
	pswMd5String := hex.EncodeToString(pswMd5[:])

	if pswMd5String == user.Password {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"id_user": user.Id_user,
		})
		tokenString, _ := token.SignedString(jwtKey)
		tokenDto.Token = tokenString
		tokenDto.Id_user = user.Id_user
		tokenDto.Role = user.Role
		return tokenDto, nil
	} else {
		return tokenDto, e.NewBadRequestApiError("contrasenia incorrecta")
	}

}
