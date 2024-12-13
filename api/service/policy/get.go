package policy

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

func getPolicy(x int) (model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return model.User{}, err
	}
	var user model.User
	db.First(&user)

	return user, err
}
