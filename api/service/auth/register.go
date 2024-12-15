package auth

import (
	"github.com/campbell-frost/policy-link-solutions/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Post("/auth/login", service.RpcHandler(login))
	r.Post("/auth/createUser", service.RpcHandler(createUser))
}
