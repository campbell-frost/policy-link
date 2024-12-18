package policy

import (
	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
)

func list(model.Nothing) ([]model.Policy, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}

	var policies []model.Policy

	result := db.Find(&policies)
	if result.Error != nil {
		return nil, result.Error
	}

	return policies, nil
}
