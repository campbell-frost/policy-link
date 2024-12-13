package model

import "github.com/google/uuid"

type Policy struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserId          uuid.UUID `gorm:"type:uuid;foreignKey:Users"`
	Name            string
	Purpose         string
	Procedure       string
	PolicyStatement string
	Equipment       string
	Addendums       string
	Active          bool
}
