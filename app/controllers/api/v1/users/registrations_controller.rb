# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!, only: :create

  def create
    user = User.new(user_params)
    user.save!

    sign_in user

    render_json(user: user)
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
end
