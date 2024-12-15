package auth

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func createUser(req *model.User) (string, error) {
	db, err := database.Connect()
	if err != nil {
		return "", err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	req.Password = string(hashedPassword)

	result := db.Create(req)
	if result.Error != nil {
		return "", result.Error
	}

	token := jwt.New(jwt.SigningMethodHS256)

	return token.Raw, nil
}
