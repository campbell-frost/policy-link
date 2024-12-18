package auth

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func signUp(req *model.User) (string, error) {
	db, err := database.Connect()
	if err != nil {
		return "", err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	req.Password = string(hashedPassword)

	req.ID = uuid.New()

	result := db.Create(req)
	if result.Error != nil {
		return "", result.Error
	}

	return makeSession(req.ID)
}
