package user

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

func listUsers(model.Nothing) ([]model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}
	var users []model.User

	_ = db.Find(&users)
	return users, nil
}
