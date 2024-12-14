package user

import (
	"fmt"

	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

func getUser(x string) (model.User, error) {
	db, err := database.Connect()
	fmt.Println("string is ", x)
	if err != nil {
		return model.User{}, err
	}
	var user model.User
	db.First(&user)
	fmt.Println(user)

	return user, err
}
