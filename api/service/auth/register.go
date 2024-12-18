package auth

import (
	"github.com/campbell-frost/policy-link-solutions/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Post("/auth/signIn", service.RpcHandler(signIn))
	r.Post("/auth/signUp", service.RpcHandler(signUp))
}
