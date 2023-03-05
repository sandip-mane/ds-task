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
        auth_token: current_user.authentication_token,
        first_name: current_user.first_name,
        last_name: current_user.last_name
      }
    }
  end
end
