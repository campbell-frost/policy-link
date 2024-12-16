package model

import (
	"time"

	"github.com/google/uuid"
)

type Policy struct {
	ID              uuid.UUID   `gorm:"type:uuid;primaryKey" json:"id"`
	UserId          uuid.UUID   `gorm:"type:uuid;foreignKey:Users" json:"userId"`
	Name            *string     `json:"name"`
	Purpose         *string     `json:"purpose"`
	Procedure       *string     `json:"procedure"`
	PolicyStatement *string     `json:"policyStatement"`
	Equipment       *string     `json:"equipment"`
	Addendums       *string     `json:"addendums"`
	Active          *bool       `json:"active"`
	Attachments     *string     `json:"attachments"`
	References      *string     `json:"references"`
	RelatedLinks    *string     `json:"relatedLinks"`
	OriginationDate *time.Time  `json:"originationDate"`
	EffectiveDate   *time.Time  `json:"effectiveDate"`
	LastApproved    *time.Time  `json:"lastApproved"`
	LastRevised     *time.Time  `json:"lastRevised"`
	NextReview      *time.Time  `json:"nextReview"`
	OwnerId         uuid.UUID   `json:"ownerId"`
	Area            *string     `json:"area"`
	Signatures      []Signature `gorm:"foreignKey:PolicyID" json:"signatures"`
}
