package user

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

func getUser(id string) (model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return model.User{}, err
	}

	var user model.User

	_ = db.First(&user, "id = ?", id)

	return user, err
}
