Rails.application.routes.draw do
  root "pages#index"

  get "*path", to: "pages#index", constraints: -> (request) do
    request.path.exclude?("/rails") && !request.xhr? && request.format.html?
  end
end
