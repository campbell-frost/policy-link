package user

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

func createUser(user model.User) (model.Nothing, error) {
	db, err := database.Connect()
	if err != nil {
		return model.Nothing{}, err
	}

	db.Create(&user)

	return model.Nothing{}, err
}
