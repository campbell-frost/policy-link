package user

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

func listUsers(name string) ([]model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}
	var users []model.User
	result := db.Where("email LIKE ?", "%"+name+"%").Find(&users)
	return users, result.Error
}
