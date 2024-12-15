package model

type Session struct {
	ID        string `gorm:"primaryKey" json:"id"`
	Token     string `json:"token"`
	ExpiresAt int64  `json:"expiresAt"`
}
