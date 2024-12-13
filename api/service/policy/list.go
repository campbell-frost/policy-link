package policy

import (
	"fmt"
	"net/http"
)

func listPolicies(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "This is the list of policies")
}
