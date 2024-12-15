package auth

import (
	"errors"

	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func login(request *LoginRequest) (string, error) {
	db, err := database.Connect()
	if err != nil {
		return "", err
	}

	user := model.User{}
	result := db.Where("email = ?", request.Email).First(&user)
	if result.Error != nil {
		return "", errors.New(result.Error.Error())
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	return "dis is a token!", nil
}
