package model

import (
	"time"

	"github.com/google/uuid"
)

type Signature struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	PolicyID  uuid.UUID `gorm:"type:uuid" json:"policyId"`
	SignedAt  time.Time `json:"signedAt"`
	Comments  *string   `json:"comments"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}
