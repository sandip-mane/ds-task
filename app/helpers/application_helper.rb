# frozen_string_literal: true

module ApplicationHelper
  def application_props
    {}.merge(user_props)
  end

  def user_props
    return {} unless current_user

    {
      user: {
        email: current_user.email,
        auth_token: current_user.authentication_token
      }
    }
  end
end
