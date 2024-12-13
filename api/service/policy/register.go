package policy

import (
	"github.com/campbell-frost/policy-link-solutions/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Get("/policy/getUser", service.RpcHandler(getPolicy))
	r.Get("/list", listPolicies)
}
