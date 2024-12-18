package model

import "github.com/google/uuid"

type Session struct {
	ID        uuid.UUID `gorm:"primaryKey" json:"id"`
	Token     string    `json:"token"`
	ExpiresAt int64     `json:"expiresAt"`
	UserID    uuid.UUID `gorm:"type:uuid;not null" json:"userId"`
	User      User      `gorm:"foreignKey:UserID;references:ID"`
}
