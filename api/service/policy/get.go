package policy

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

type GetRequest struct {
	ID string `json:"id"`
}

func get(req *GetRequest) (model.Policy, error) {
	db, err := database.Connect()
	if err != nil {
		return model.Policy{}, err
	}

	var policy model.Policy

	result := db.Where("id = ?", req.ID).Find(&policy)
	if result.Error != nil {
		return model.Policy{}, result.Error
	}

	return policy, nil
}
