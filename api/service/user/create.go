package user

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

func createUser(user model.User) (struct{}, error) {
	db, err := database.Connect()
	if err != nil {
		return struct{}{}, err
	}

	db.Create(&user)

	return struct{}{}, err
}
