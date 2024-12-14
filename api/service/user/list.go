package user

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
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
