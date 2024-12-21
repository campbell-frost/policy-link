package auth

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

type GetUserRequest struct {
	Token string
}

func getUser(req GetUserRequest) (model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return model.User{}, err
	}

	var session model.Session
	session.Token = req.Token

	result := db.First(&session)
	if result.Error != nil {
		return model.User{}, result.Error
	}

	var user model.User

	user.ID = session.UserID

	result = db.First(&user)
	if result.Error != nil {
		return model.User{}, result.Error
	}

	user.Password = ""

	return user, nil
}
