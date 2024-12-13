package user

import (
	"fmt"

	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

func getUser(id int) (model.User, error) {
	db, err := database.Connect()
	if err != nil {
		return model.User{}, err
	}
	var user model.User
	db.First(&user)
	fmt.Println(user)

	return user, err
}
