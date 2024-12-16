package auth

import (
	"github.com/campbell-frost/policy-link-solutions/database"
	"github.com/campbell-frost/policy-link-solutions/model"
)

type LogoutRequest struct {
	Token string `json:"token"`
}

func logout(req *LogoutRequest) (model.Nothing, error) {
	db, err := database.Connect()
	if err != nil {
		return model.Nothing{}, err
	}

	err = db.Where("token = ?", req.Token).Delete(&model.Session{}).Error
	if err != nil {
		return model.Nothing{}, err
	}
	return model.Nothing{}, nil
}
