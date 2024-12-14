package model

import "github.com/google/uuid"

type Policy struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserId          uuid.UUID `gorm:"type:uuid;foreignKey:Users" json:"userId"`
	Name            string    `json:"name"`
	Purpose         string    `json:"purpose"`
	Procedure       string    `json:"procedure"`
	PolicyStatement string    `json:"policyStatement"`
	Equipment       string    `json:"equipment"`
	Addendums       string    `json:"addendums"`
	Active          bool      `json:"active"`
}
