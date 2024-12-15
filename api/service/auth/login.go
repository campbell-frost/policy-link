package auth

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
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

	db.Where("email = ?", request.Email).First(&user)

	return "dis is a token!", nil
}
